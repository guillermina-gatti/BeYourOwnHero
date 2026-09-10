import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, data: {
        title: string;
        description?: string;
        points?: number;
        isActive?: boolean;
    }) {
        return this.prisma.habit.create({
            data: {
                userId,
                ...data,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.habit.findMany({
            where: { userId },
        });
    }
}