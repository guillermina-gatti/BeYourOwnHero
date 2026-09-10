import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateHabitDto } from './dto/create-habit.dto';
import { HabitsService } from './habits.service';

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) { }

    @Post()
    create(
        @Req() req: Request,
        @Body() createHabitDto: CreateHabitDto,
    ) {
        const userId = req.headers['user-id'];

        return this.habitsService.create(
            userId as string,
            createHabitDto,
        );
    }

    @Get()
    findAll(@Req() req: Request) {
        const userId = req.headers['user-id'];

        return this.habitsService.findAll(userId as string);
    }
}