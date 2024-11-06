import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongoose/entities/User';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private workoutService: WorkoutService,
	) {}

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
		userId: number,
		userDetails: { username: string; password: string; email: string },
	) {
		return this.userModel.findOneAndUpdate({ _id: userId }, { ...userDetails });
	}

	async deleteUser(id: number) {
		await this.userModel.deleteOne({ _id: id });
	}

	async addWorkout(userId: string, workoutIds: string[]) {
		const workout = await this.workoutService.getWorkoutsById(workoutIds);
		const currentUser = await this.userModel
			.findOne({ id: userId })
			.populate('myWorkouts');

		if (!currentUser) {
			throw new Error('User not found');
		}

		workout.map((x) => {
			currentUser.myWorkouts.unshift(x._id);
		});

		currentUser.save();

		return workout;
	}
}
