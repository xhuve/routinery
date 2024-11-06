import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsEmpty,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from 'src/exercise/dtos/CreateExerciseDto';
import { CreateCommentDto } from 'src/comment/dtos/CreateCommentDto';
import { Types } from 'mongoose';
import { User } from 'src/mongoose/entities/User';

export class CreateWorkoutDto {
	@IsString()
	@ApiProperty()
	name: string;

	durationInMinutes: number;

	creator: Types.ObjectId;

	@ApiProperty({ type: [CreateExerciseDto] })
	@IsOptional()
	exercises: string[];

	@ApiProperty({ type: [CreateCommentDto] })
	@IsOptional()
	comments: string[];
}
