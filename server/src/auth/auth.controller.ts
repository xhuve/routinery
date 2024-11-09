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

		const { updatedAt } = userData;
		const resetStreak =
			updatedAt.getTime() + 1000 * 60 * 60 * 24 * 2 < Date.now();
		// if updatedTime + 2 days is smaller than the current time, it means that
		// the user has logged in earlier than 2 days, which means that the streak continues and doesnt end
		// otherwise activeStreak = 0
		const continueStreak =
			updatedAt.getTime() + 1000 * 60 * 60 * 24 > Date.now();
		// if updatedAt + 1 day is more than the current time, it means that the user has
		// consecutively logged in 2 times in a row

		// previous implementation was stupid as hell, also this doesnt seem like the best option
		// to add a lastLogin date attribute would be wiser

		if (resetStreak) {
			console.log('reset');
			userData.activeStreak = 0;
		} else if (continueStreak) {
			console.log('increase');
			userData.activeStreak = userData.activeStreak + 1;
		}

		await userData.save();
		return userData;
	}
}
