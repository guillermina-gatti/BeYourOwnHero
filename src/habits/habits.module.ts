import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
    ],
    controllers: [HabitsController],
    providers: [HabitsService],
    exports: [HabitsService],
})
export class HabitsModule { }