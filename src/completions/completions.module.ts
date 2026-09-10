import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { CompletionsController } from './completions.controller';
import { CompletionsService } from './completions.service';

@Module({
    imports: [PrismaModule],
    controllers: [CompletionsController],
    providers: [CompletionsService],
    exports: [CompletionsService],
})
export class CompletionsModule { }