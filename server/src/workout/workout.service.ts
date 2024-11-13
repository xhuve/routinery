import { Injectable } from '@nestjs/common';
import { Workout } from 'src/mongoose/entities/Workout';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/mongoose/entities/Exercise';
import { Comment } from 'src/mongoose/entities/Comment';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/mongoose/entities/User';
import { find } from 'rxjs';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
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

		console.log({
			pageNumber,
			pageLimit,
			skipAmount: pageLimit * pageNumber,
			userId,
		});

		const workoutPagination = await this.workoutModel
			.find({ creator: { $in: [userId, null] } })
			.limit(pageLimit)
			.skip(pageLimit * pageNumber)
			.populate('exercises');

		console.log('Found workouts:', workoutPagination.length);

		const totalWorkouts = await this.workoutModel.countDocuments({
			$or: [{ creator: userId }, { creator: null }],
		});

		console.log('Total workouts:', totalWorkouts);

		return {
			workouts: workoutPagination,
			totalWorkouts: totalWorkouts,
		};
	}

	getWorkoutById(workoutId: string) {
		const workout = this.workoutModel.findById(workoutId).populate({
			path: 'exercises',
			model: 'Exercise',
		});

		return workout;
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exerciseIds = newWorkout.exercises.map(
			(id) => new Types.ObjectId(id),
		);

		const exercises = await this.exerciseModel.find({
			_id: { $in: exerciseIds },
		});

		if (exercises.length !== exerciseIds.length) {
			throw new Error('One or more exercises not found');
		}

		const workout = await this.workoutModel.create({
			...newWorkout,
			exercises: exerciseIds,
		});

		const currentUser = await this.userModel.findById(newWorkout.creator);
		currentUser.myWorkouts.unshift(workout._id);
		await currentUser.save();

		await this.exerciseModel.updateMany(
			{ _id: { $in: exerciseIds } },
			{ $push: { workouts: workout._id } },
		);

		return workout;
	}

	async deleteWorkout(_id: string) {
		await this.workoutModel.deleteOne({ _id });
	}

	async updateWorkout(workoutId: string, workoutData: CreateWorkoutDto) {
		await this.workoutModel.updateOne(
			{ _id: workoutId },
			{ $set: workoutData },
		);
	}
}
