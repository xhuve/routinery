import { Injectable, Logger } from '@nestjs/common';
import { Workout } from 'src/mongoose/entities/Workout';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/mongoose/entities/Exercise';
import { Comment } from 'src/mongoose/entities/Comment';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'typeorm';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
	) {}

	private readonly logger = new Logger(WorkoutService.name);

	async getWorkouts(pageNumber: number, userId: string) {
		const pageLimit = parseInt(process.env.PAGINATION_LIMIT);

		const workoutPagination = await this.workoutModel
			.find({ $or: [{ creator: userId }, { creator: 'admin' }] })
			.limit(pageLimit)
			.skip(pageLimit * pageNumber)
			.populate(['exercises', 'comments']);

		const totalWorkouts = await this.workoutModel.countDocuments({
			$or: [{ creator: userId }, { creator: 'admin' }],
		});

		return { workouts: workoutPagination, totalWorkouts };
	}

	getWorkoutsById(workoutIds: string[]) {
		return this.workoutModel.find({ _id: { $in: workoutIds } });
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exercisesObjectIds = newWorkout.exercises.map(
			(x) => new mongoose.Types.ObjectId(x),
		);

		const exercises = await this.exerciseModel.find({
			_id: {
				$in: exercisesObjectIds,
			},
		});

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
		});
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
