import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, name: string, password: string) {
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            email,
            name,
            passwordHash,
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });

        const refreshToken = await this.jwtService.signAsync(
            {
                sub: user.id,
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
            },
        );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.usersService.updateRefreshToken(
            user.id,
            hashedRefreshToken,
        );

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async refresh(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findById(payload.sub);

            if (!user || !user.hashedRefreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const refreshTokenValid = await bcrypt.compare(
                refreshToken,
                user.hashedRefreshToken,
            );

            if (!refreshTokenValid) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const accessToken = await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
            });

            return {
                accessToken,
            };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}