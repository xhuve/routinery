import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty()
	@IsString()
	username: string;
	@ApiProperty()
	@IsString()
	password: string;
}
