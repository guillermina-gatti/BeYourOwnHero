import {
    IsInt,
    IsNotEmpty,
} from 'class-validator';

export class CreateCompletionDto {
    @IsInt()
    @IsNotEmpty()
    habitId: number;
}