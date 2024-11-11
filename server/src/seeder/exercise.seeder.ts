import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

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
					exercisePicture: 'a',
				},
				{
					name: 'Squat',
					type: 'Strength',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Bench Press',
					type: 'Strength',
					length: 40,
					exercisePicture: 'a',
				},
				{
					name: 'Deadlift',
					type: 'Strength',
					length: 50,
					exercisePicture: 'a',
				},
				{
					name: 'Bicep Curl',
					type: 'Strength',
					length: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Tricep Dip',
					type: 'Strength',
					length: 25,
					exercisePicture: 'a',
				},
				{
					name: 'Lunges',
					type: 'Strength',
					length: 35,
					exercisePicture: 'a',
				},
				{
					name: 'Pull Up',
					type: 'Strength',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Shoulder Press',
					type: 'Strength',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Chest Fly',
					type: 'Strength',
					length: 20,
					exercisePicture: 'a',
				},
				{
					name: 'Running',
					type: 'Cardio',
					length: 60,
					exercisePicture: 'a',
				},
				{
					name: 'Cycling',
					type: 'Cardio',
					length: 45,
					exercisePicture: 'a',
				},
				{
					name: 'Jump Rope',
					type: 'Cardio',
					length: 20,
					exercisePicture: 'a',
				},
				{
					name: 'Mountain Climbers',
					type: 'Cardio',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Burpees',
					type: 'Cardio',
					length: 25,
					exercisePicture: 'a',
				},
				{
					name: 'Rowing',
					type: 'Cardio',
					length: 50,
					exercisePicture: 'a',
				},
				{
					name: 'High Knees',
					type: 'Cardio',
					length: 20,
					exercisePicture: 'a',
				},
				{
					name: 'Box Jump',
					type: 'Cardio',
					length: 20,
					exercisePicture: 'a',
				},
				{
					name: 'Jumping Jacks',
					type: 'Cardio',
					length: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Sprints',
					type: 'Cardio',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Yoga',
					type: 'Flexibility',
					length: 45,
					exercisePicture: 'a',
				},
				{
					name: 'Pilates',
					type: 'Flexibility',
					length: 40,
					exercisePicture: 'a',
				},
				{
					name: 'Static Stretching',
					type: 'Flexibility',
					length: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Dynamic Stretching',
					type: 'Flexibility',
					length: 20,
					exercisePicture: 'a',
				},
				{
					name: 'Hamstring Stretch',
					type: 'Flexibility',
					length: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Quadriceps Stretch',
					type: 'Flexibility',
					length: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Shoulder Stretch',
					type: 'Flexibility',
					length: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Back Stretch',
					type: 'Flexibility',
					length: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Hip Flexor Stretch',
					type: 'Flexibility',
					length: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Calf Stretch',
					type: 'Flexibility',
					length: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Calf Stretch',
					type: 'Flexibility',
					length: 10,
					exercisePicture: 'a',
				},
			];

			exercises.sort(() => Math.random() - 0.5);

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
