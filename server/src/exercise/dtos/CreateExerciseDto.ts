import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	type: string;

	@IsOptional()
	@ApiProperty()
	@IsNumber()
	length: number;
}
