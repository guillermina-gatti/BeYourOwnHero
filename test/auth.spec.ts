import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthService } from '../src/auth/auth.service';

describe('Auth', () => {
    let authService: AuthService;

    const usersService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
    };

    const jwtService = {
        signAsync: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();

        authService = new AuthService(
            usersService as any,
            jwtService as any,
        );
    });

    it('registers a new user', async () => {
        usersService.findByEmail.mockResolvedValue(null);

        usersService.create.mockResolvedValue({
            id: 'test-id',
            email: 'test@example.com',
            name: 'Test User',
        });

        const result = await authService.register(
            'test@example.com',
            'Test User',
            '123456',
        );

        expect(result).toEqual({
            id: 'test-id',
            email: 'test@example.com',
            name: 'Test User',
        });

        expect(usersService.create).toHaveBeenCalled();
        expect(result).not.toHaveProperty('passwordHash');
    });
});