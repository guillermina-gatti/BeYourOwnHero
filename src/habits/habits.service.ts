import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(
        userId: string,
        data: {
            title: string;
            description?: string;
            points?: number;
            isActive?: boolean;
        },
    ) {
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

    async findOne(userId: string, id: number) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!habit) {
            throw new NotFoundException('Habit not found');
        }

        return habit;
    }

    async update(
        userId: string,
        id: number,
        data: {
            title?: string;
            description?: string;
            points?: number;
            isActive?: boolean;
        },
    ) {
        await this.findOne(userId, id);

        return this.prisma.habit.update({
            where: { id },
            data,
        });
    }

    async remove(userId: string, id: number) {
        await this.findOne(userId, id);

        await this.prisma.habit.delete({
            where: { id },
        });

        return {
            message: 'Habit deleted successfully',
        };
    }
}