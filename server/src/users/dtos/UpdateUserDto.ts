import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	username: string;
	@ApiProperty()
	@IsEmail()
	email: string;
	@ApiProperty()
	@IsString()
	newPassword: string;
	@ApiProperty()
	@IsString()
	password: string;
	@ApiProperty()
	@IsString()
	profilePicture: string;
	@ApiProperty()
	@IsString()
	gender: string;
}
