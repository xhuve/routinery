import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Exercise, ExerciseDocument } from 'src/mongoose/entities/Exercise';

@Injectable()
export class ExerciseSeeder {
	constructor(
		@InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
	) {}

	async seedExercises() {
		try {
			const count = await this.exerciseModel.countDocuments();
			if (count > 0) return;

			const exercises = [
				{
					name: 'Push Up',
					type: 'Strength',
					length: 30,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Running',
					type: 'Cardio',
					length: 60,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Yoga',
					type: 'Flexibility',
					length: 45,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Squat',
					type: 'Strength',
					length: 30,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Jump Rope',
					type: 'Cardio',
					length: 20,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Plank',
					type: 'Core',
					length: 60,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Bench Press',
					type: 'Strength',
					length: 40,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Cycling',
					type: 'Cardio',
					length: 45,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Deadlift',
					type: 'Strength',
					length: 50,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Burpees',
					type: 'Cardio',
					length: 25,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Lunges',
					type: 'Strength',
					length: 35,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Mountain Climbers',
					type: 'Cardio',
					length: 30,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Bicep Curl',
					type: 'Strength',
					length: 15,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Rowing',
					type: 'Cardio',
					length: 50,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'High Knees',
					type: 'Cardio',
					length: 20,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Tricep Dip',
					type: 'Strength',
					length: 25,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Side Plank',
					type: 'Core',
					length: 40,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Pull Up',
					type: 'Strength',
					length: 30,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Box Jump',
					type: 'Plyometrics',
					length: 20,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
				{
					name: 'Russian Twist',
					type: 'Core',
					length: 30,
					workouts: [new Types.ObjectId()],
					exercisePicture: 'a',
				},
			];

			await this.exerciseModel.insertMany(exercises);
		} catch (error) {
			console.log(error);
		}
	}

	async removeExercises() {
		try {
			await this.exerciseModel.deleteMany({});
		} catch (error) {
			console.log(error);
		}
	}
}
