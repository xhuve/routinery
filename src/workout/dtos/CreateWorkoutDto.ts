import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateExerciseDto } from "src/exercise/dtos/CreateExerciseDto"
import { CreateCommentDto } from "./CreateCommentDto"

export class CreateWorkoutDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsNumber()
    @ApiProperty()
    length: number

    @ValidateNested({ each: true })
    @Type(() => CreateExerciseDto)
    @ApiProperty({ type: [CreateExerciseDto] })
    exercises: CreateExerciseDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateCommentDto)
    @ApiProperty({ type: [CreateCommentDto] })
    comments: CreateCommentDto[];
}