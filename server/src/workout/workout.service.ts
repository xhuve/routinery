import { Injectable } from '@nestjs/common';
import { Workout } from 'src/mongoose/entities/Workout';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/mongoose/entities/Exercise';
import { Comment } from 'src/mongoose/entities/Comment';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
	) {}

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

	getWorkoutById(workoutId: number) {
		return this.workoutModel.findOne({ _id: workoutId });
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exercises = await this.exerciseModel.find({
			id: { $in: newWorkout.exercises || [] },
		});
		const comments = await this.commentModel.find({
			id: { $in: newWorkout.comments || [] },
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
}
