import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User } from 'src/mongoose/entities/User';
import { WorkoutService } from 'src/workout/workout.service';

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

	updateUser(
		userId: string,
		userDetails: {
			username: string;
			password: string;
			email: string;
			myWorkouts: string[] | null;
		},
	) {
		if (userDetails.myWorkouts) {
			const ObjectIDWorkouts = userDetails.myWorkouts.map(
				(x) => new mongoose.Types.ObjectId(x),
			);

			return this.userModel.findOneAndUpdate(
				{ _id: userId },
				{ ...userDetails, myWorkouts: ObjectIDWorkouts },
			);
		}
		return this.userModel.findOneAndUpdate({ _id: userId }, { ...userDetails });
	}

	async deleteUser(id: string) {
		await this.userModel.deleteOne({ _id: id });
	}
}
