import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/RegisterDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async regiser(
		@Body() userDetails: RegisterDto,
		@Res({ passthrough: true })
		response: Response,
	) {
		const { newUser, accessToken } =
			await this.authService.register(userDetails);
		console.log('🚀 ~ AuthController ~ newUser:', newUser);
		response.cookie('user_token', accessToken);

		return newUser;
	}

	@Post('login')
	@HttpCode(200)
	async login(
		@Body() userDetails: LoginDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, user } = await this.authService.login(userDetails);
		response.cookie('user_token', accessToken);
		return 'Testing';
	}
}
