import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(
            registerDto.email,
            registerDto.name,
            registerDto.password,
        );
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(
            loginDto.email,
            loginDto.password,
        );
    }

    @Post('refresh')
    refresh(@Body() refreshDto: RefreshDto) {
        return this.authService.refresh(refreshDto.refreshToken);
    }

    @Post('logout')
    logout(@Req() req: Request) {
        const userId = req.headers['user-id'];

        if (!userId || Array.isArray(userId)) {
            throw new UnauthorizedException();
        }

        return this.authService.logout(userId);
    }

    @Get('me')
    me(@Req() req: Request) {
        const userId = req.headers['user-id'];

        if (!userId || Array.isArray(userId)) {
            throw new UnauthorizedException();
        }

        return this.authService.me(userId);
    }
}