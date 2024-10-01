import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @ApiProperty()
  @IsArray()
  workouts: Array<number> = [];
}
