import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Workout } from "src/typeorm/entities/Workout";

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    workoutId: number
}