import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
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
}
