import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	username: string;
	@ApiProperty()
	@IsEmail()
	email: string;
	@ApiProperty()
	@IsString()
	password: string;
	@IsDate()
	createdAt: Date;
	@IsArray()
	myWorkouts: string[];
}
