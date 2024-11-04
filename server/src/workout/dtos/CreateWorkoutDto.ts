import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from 'src/exercise/dtos/CreateExerciseDto';
import { CreateCommentDto } from 'src/comment/dtos/CreateCommentDto';

export class CreateWorkoutDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsNumber()
	@ApiProperty()
	length: number;

	@IsDate()
	@ApiProperty()
	workoutTime: Date;

	@ValidateNested({ each: true })
	@Type(() => CreateExerciseDto)
	@ApiProperty({ type: [CreateExerciseDto] })
	@IsOptional()
	exercises: CreateExerciseDto[];

	@ValidateNested({ each: true })
	@Type(() => CreateCommentDto)
	@ApiProperty({ type: [CreateCommentDto] })
	@IsOptional()
	comments: CreateCommentDto[];
}
