import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token required');
        }

        const token = authHeader.substring(7);

        try {
            const payload = await this.jwtService.verifyAsync(token);

            request.headers['user-id'] = payload.sub;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}