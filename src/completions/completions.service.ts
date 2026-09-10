import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompletionsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, habitId: number) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id: habitId,
                userId,
            },
        });

        if (!habit) {
            throw new NotFoundException('Habit not found');
        }

        return this.prisma.completion.create({
            data: {
                habitId,
                userId,
                pointsEarned: habit.points,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.completion.findMany({
            where: { userId },
        });
    }
}