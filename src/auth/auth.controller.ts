import { Body, Controller, Post } from '@nestjs/common';
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
}