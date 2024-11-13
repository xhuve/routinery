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
import { ApiTags } from '@nestjs/swagger';
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
		console.log('entering');
		const { newUser, accessToken } =
			await this.authService.register(userDetails);
		response.cookie('user_token', accessToken, {
			httpOnly: true,
		});

		return newUser;
	}

	@Post('login')
	@HttpCode(200)
	async login(
		@Body() userDetails: LoginDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, user } = await this.authService.login(userDetails);
		console.log(accessToken);
		response.cookie('user_token', accessToken);
		return user;
	}

	@Get('logout')
	@UseGuards(JwtPasswordStrategy)
	logout(@Res({ passthrough: true }) response: Response) {
		response.cookie('user_token', '', { httpOnly: true, expires: new Date(0) });
		return { message: 'Logged out successfully' };
	}

	@Get('me')
	@UseGuards(JwtPasswordStrategy)
	async getUserInfo(@Req() request: Request) {
		const user = request.user as { userId: string; username: string };
		const userData = await this.userService.getUserById(user.userId);

		const { lastLogin } = userData;

		const resetStreak =
			lastLogin.getTime() + 1000 * 60 * 60 * 24 * 2 < Date.now();
		// if updatedTime + 2 days is smaller than the current time, it means that
		// the user has logged in earlier than 2 days, which means that the streak continues and doesnt end
		// otherwise activeStreak = 0

		const continueStreak =
			lastLogin.getTime() + 1000 * 60 * 60 * 24 < Date.now();
		// if updatedAt + 1 day is more than the current time, it means that the user has
		// consecutively logged in 2 times in a row

		if (resetStreak) {
			console.log('reset');
			userData.activeStreak = 0;
			userData.lastLogin = new Date(Date.now());
		} else if (continueStreak) {
			console.log('increase');
			userData.activeStreak += 1;
			userData.lastLogin = new Date(Date.now());
		}

		await userData.save();
		return userData;
	}
}
