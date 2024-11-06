import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/RegisterDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';
import { Request, Response } from 'express';
import { JwtPasswordStrategy } from './guards/passport-jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UsersService,
	) {}

	@Post('register')
	async regiser(
		@Body() userDetails: RegisterDto,
		@Res({ passthrough: true })
		response: Response,
	) {
		const { newUser, accessToken } =
			await this.authService.register(userDetails);
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
		return user;
	}

	@Get('logout')
	@UseGuards(JwtPasswordStrategy)
	logout(@Res({ passthrough: true }) response: Response) {
		response.cookie('user_token', '', { httpOnly: true, expires: new Date(0) });
		return response.send('Logged out successfully');
	}

	@Get('me')
	@UseGuards(JwtPasswordStrategy)
	async getUserInfo(@Req() request: Request) {
		const user = request.user as { userId: string; username: string };
		const userData = await this.userService.getUserById(user.userId);
		if (userData.updatedAt > new Date()) {
			userData.activeStreak = 0;
			userData.totalWorkouts = 0;
		}
		return userData;
	}
}
