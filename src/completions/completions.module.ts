import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

import { CompletionsController } from './completions.controller';
import { CompletionsService } from './completions.service';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
    ],
    controllers: [CompletionsController],
    providers: [CompletionsService],
    exports: [CompletionsService],
})
export class CompletionsModule { }