import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateExerciseDto } from 'src/exercise/dtos/CreateExerciseDto';
import { CreateCommentDto } from 'src/comment/dtos/CreateCommentDto';
import { Types } from 'mongoose';

export class CreateWorkoutDto {
	@IsString()
	@ApiProperty()
	name: string;

	durationInMinutes: number;

	creator: Types.ObjectId | null;

	@ApiProperty({ type: [CreateExerciseDto] })
	@IsOptional()
	exercises: string[];

	@ApiProperty({ type: [CreateCommentDto] })
	@IsOptional()
	comments: string[];
}
