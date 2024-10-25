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

	getWorkouts() {
		return this.workoutModel.find({}).populate(['exercises', 'comments']);
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

		const workout = await this.workoutModel.create({
			...newWorkout,
			exercises,
			comments,
		});
		return await workout.save();
	}

	async deleteWorkout(id: number) {
		await this.workoutModel.deleteOne({ _id: id });
	}
}
