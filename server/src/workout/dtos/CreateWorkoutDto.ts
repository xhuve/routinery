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

	@IsNumber()
	@IsEmpty()
	durationInMinutes: number;

	@IsDate()
	@ApiProperty()
	startTime: Date;

	@IsString()
	@ValidateNested()
	@ApiProperty()
	creator: Types.ObjectId;

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
