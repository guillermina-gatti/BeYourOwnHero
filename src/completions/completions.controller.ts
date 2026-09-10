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
import { CreateCompletionDto } from './dto/create-completion.dto';
import { CompletionsService } from './completions.service';

@Controller('completions')
@UseGuards(JwtAuthGuard)
export class CompletionsController {
    constructor(
        private readonly completionsService: CompletionsService,
    ) { }

    @Post()
    create(
        @Req() req: Request,
        @Body() createCompletionDto: CreateCompletionDto,
    ) {
        const userId = req.headers['user-id'];

        return this.completionsService.create(
            userId as string,
            createCompletionDto.habitId,
        );
    }

    @Get()
    findAll(@Req() req: Request) {
        const userId = req.headers['user-id'];

        return this.completionsService.findAll(
            userId as string,
        );
    }
}