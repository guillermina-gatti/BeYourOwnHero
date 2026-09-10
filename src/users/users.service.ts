import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async create(data: {
        email: string;
        name: string;
        passwordHash: string;
    }) {
        return this.prisma.user.create({
            data,
        });
    }

    async updateRefreshToken(
        id: string,
        hashedRefreshToken: string,
    ) {
        return this.prisma.user.update({
            where: { id },
            data: { hashedRefreshToken },
        });
    }
}