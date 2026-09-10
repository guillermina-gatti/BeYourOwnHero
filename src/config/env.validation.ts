import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Min,
    MinLength,
    validateSync,
} from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment = Environment.Development;

    @IsString()
    @IsNotEmpty()
    DATABASE_URL!: string;

    @IsString()
    @MinLength(32, { message: 'JWT_SECRET debe tener al menos 32 caracteres' })
    JWT_SECRET!: string;

    @IsString()
    @IsNotEmpty()
    JWT_EXPIRES_IN!: string;

    @IsString()
    @MinLength(32, {
        message: 'JWT_REFRESH_SECRET debe tener al menos 32 caracteres',
    })
    JWT_REFRESH_SECRET!: string;

    @IsString()
    @IsNotEmpty()
    JWT_REFRESH_EXPIRES_IN!: string;

    @IsString()
    @IsNotEmpty()
    CORS_ORIGIN!: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    PORT!: number;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
    const validated = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validated, { skipMissingProperties: false });

    if (
        validated.JWT_SECRET &&
        validated.JWT_REFRESH_SECRET &&
        validated.JWT_SECRET === validated.JWT_REFRESH_SECRET
    ) {
        errors.push({
            property: 'JWT_REFRESH_SECRET',
            constraints: { distinct: 'JWT_SECRET y JWT_REFRESH_SECRET deben ser distintos' },
            target: validated,
            value: validated.JWT_REFRESH_SECRET,
            children: [],
        });
    }

    if (errors.length > 0) {
        throw new Error(`Configuración inválida:\n${JSON.stringify(errors, null, 2)}`);
    }

    return validated;
}