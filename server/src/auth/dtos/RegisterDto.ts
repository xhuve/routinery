import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
	@ApiProperty()
	@IsString()
	username: string;
	@ApiProperty()
	@IsEmail({}, { message: 'Incorrect email format!' })
	email: string;
	@ApiProperty()
	@IsString()
	password: string;
	@ApiProperty()
	@IsString()
	gender: string;
}
