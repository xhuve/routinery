import { Injectable } from '@nestjs/common';
import { Workout } from 'src/mongoose/entities/Workout';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/mongoose/entities/Exercise';
import { Comment } from 'src/mongoose/entities/Comment';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/mongoose/entities/User';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
		@InjectModel(User.name) private userModel: Model<User>,
	) {}

	async getAllWorkouts(pageNumber: number) {
		const pageLimit = parseInt(process.env.PAGINATION_LIMIT);

		const workoutPagination = await this.workoutModel
			.find({})
			.limit(pageLimit)
			.skip(pageLimit * pageNumber)
			.populate(['exercises', 'comments'])
			.populate({
				path: 'creator',
			});

		const totalWorkouts = await this.workoutModel.countDocuments({});

		return {
			workouts: workoutPagination,
			totalWorkouts: totalWorkouts,
		};
	}

	async getUserWorkouts(pageNumber: number, userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new Error('Invalid user ID format');
		}

		const pageLimit = parseInt(process.env.PAGINATION_LIMIT);
		const workoutPagination = await this.workoutModel
			.find({ creator: { $in: [new mongoose.Types.ObjectId(userId), null] } })
			.limit(pageLimit)
			.skip(pageLimit * pageNumber)
			.populate(['exercises', 'comments']);

		console.log(workoutPagination);

		const totalWorkouts = await this.workoutModel.countDocuments({
			$or: [{ creator: userId }, { creator: null }],
		});

		return {
			workouts: workoutPagination,
			totalWorkouts: totalWorkouts,
		};
	}

	getWorkoutsById(workoutIds: string[]) {
		return this.workoutModel.find({ _id: { $in: workoutIds } });
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exercises = await this.exerciseModel.find({
			_id: {
				$in: newWorkout.exercises,
			},
		});

		const currentUser = await this.userModel
			.findOne({ _id: newWorkout.creator })
			.populate(['myWorkouts']);

		const comments = await this.commentModel.find({
			_id: { $in: newWorkout.comments || [] },
		});

		newWorkout.durationInMinutes = exercises.reduce((acc, curr) => {
			return acc + curr.length;
		}, 0);

		const workout = await this.workoutModel.create({
			...newWorkout,
			exercises,
			comments,
			creator: currentUser._id,
		});

		currentUser.myWorkouts.unshift(workout._id);
		await currentUser.save();

		return await workout.save();
	}

	async deleteWorkout(id: string) {
		await this.workoutModel.deleteOne({ _id: id });
	}

	async updateWorkout(workoutId: string, workoutData: CreateWorkoutDto) {
		await this.workoutModel.updateOne(
			{ _id: workoutId },
			{ $set: workoutData },
		);
	}
}
