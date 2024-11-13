import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongoose/entities/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	getUsers() {
		return this.userModel.find();
	}

	getUserById(id: string) {
		return this.userModel.findOne({ _id: id }).select('-password');
	}

	getUserByUsername(username: string) {
		return this.userModel.findOne({ username });
	}

	getUserWorkouts(userId: string) {
		return this.userModel.findOne({ _id: userId }).populate('myWorkouts');
	}

	async createUser(userDetails: {
		username: string;
		password: string;
		email: string;
		gender: string;
	}) {
		const newUser = await this.userModel.create({
			...userDetails,
			profilePicture: `https://avatar.iran.liara.run/public/${userDetails.gender}?username=${userDetails.username}`,
		});

		return newUser.save();
	}

	async updateUser(
		userId: string,
		userDetails: {
			username: string;
			password: string;
			newPassword: string;
			email: string;
			profilePicture: string;
			gender: string;
		},
	) {
		const user = await this.getUserById(userId);
		if (userDetails.newPassword) {
			if (!(await bcrypt.compare(userDetails.password, user.password))) {
				throw new HttpException(
					'Passwords arent matching',
					HttpStatus.BAD_REQUEST,
				);
			}
			user.password = await bcrypt.hash(userDetails.newPassword, 10);
		}

		user.username = userDetails.username;
		user.email = userDetails.email;
		user.profilePicture = userDetails.profilePicture;
		user.gender = userDetails.gender;

		return await user.save();
	}

	async deleteUser(id: string) {
		await this.userModel.deleteOne({ _id: id });
	}
}
