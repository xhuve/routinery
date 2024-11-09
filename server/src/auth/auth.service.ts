import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async signJwtToken(user: { id: string; username: string }) {
		const tokenPayload = {
			sub: user.id,
			username: user.username,
		};

		return await this.jwtService.signAsync(tokenPayload);
	}

	async validateUser(userDetails: { username: string; password: string }) {
		const user = await this.userService.getUserByUsername(userDetails.username);
		const isCorrectPassword = await bcrypt.compare(
			userDetails.password,
			user.password,
		);
		if (!user || !isCorrectPassword) {
			throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
		}

		return user;
	}

	async register(userDetails: {
		username: string;
		email: string;
		password: string;
		gender: string;
	}) {
		const { username } = userDetails;
		const password = await bcrypt.hash(userDetails.password, 10);

		const userExists = await this.userService.getUserByUsername(username);
		if (userExists) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const newUser = await this.userService.createUser({
			...userDetails,
			password,
		});
		const accessToken = this.signJwtToken({
			id: newUser._id.toString(),
			username: newUser.username,
		});
		return { newUser, accessToken };
	}

	async login(userDetails: { username: string; password: string }) {
		const user = await this.validateUser(userDetails);

		const accessToken = await this.signJwtToken({
			id: user._id.toString(),
			username: user.username,
		});
		return { user, accessToken };
	}
}
