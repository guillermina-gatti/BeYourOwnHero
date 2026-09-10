import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
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

    @Get(':id')
    findOne(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const userId = req.headers['user-id'];

        return this.habitsService.findOne(
            userId as string,
            id,
        );
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateHabitDto: UpdateHabitDto,
    ) {
        const userId = req.headers['user-id'];

        return this.habitsService.update(
            userId as string,
            id,
            updateHabitDto,
        );
    }

    @Delete(':id')
    remove(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const userId = req.headers['user-id'];

        return this.habitsService.remove(
            userId as string,
            id,
        );
    }
}