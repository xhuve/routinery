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
					durationInMinutes: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Squat',
					type: 'Strength',
					durationInMinutes: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Bench Press',
					type: 'Strength',
					durationInMinutes: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Deadlift',
					type: 'Strength',
					durationInMinutes: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Bicep Curl',
					type: 'Strength',
					durationInMinutes: 8,
					exercisePicture: 'a',
				},
				{
					name: 'Tricep Dip',
					type: 'Strength',
					durationInMinutes: 8,
					exercisePicture: 'a',
				},
				{
					name: 'Lunges',
					type: 'Strength',
					durationInMinutes: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Pull Up',
					type: 'Strength',
					durationInMinutes: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Shoulder Press',
					type: 'Strength',
					durationInMinutes: 12,
					exercisePicture: 'a',
				},
				{
					name: 'Chest Fly',
					type: 'Strength',
					durationInMinutes: 8,
					exercisePicture: 'a',
				},
				{
					name: 'Running',
					type: 'Cardio',
					durationInMinutes: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Cycling',
					type: 'Cardio',
					durationInMinutes: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Jump Rope',
					type: 'Cardio',
					durationInMinutes: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Mountain Climbers',
					type: 'Cardio',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Burpees',
					type: 'Cardio',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Rowing',
					type: 'Cardio',
					durationInMinutes: 20,
					exercisePicture: 'a',
				},
				{
					name: 'High Knees',
					type: 'Cardio',
					durationInMinutes: 3,
					exercisePicture: 'a',
				},
				{
					name: 'Box Jump',
					type: 'Cardio',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Jumping Jacks',
					type: 'Cardio',
					durationInMinutes: 3,
					exercisePicture: 'a',
				},
				{
					name: 'Sprints',
					type: 'Cardio',
					durationInMinutes: 15,
					exercisePicture: 'a',
				},
				{
					name: 'Yoga',
					type: 'Flexibility',
					durationInMinutes: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Pilates',
					type: 'Flexibility',
					durationInMinutes: 30,
					exercisePicture: 'a',
				},
				{
					name: 'Static Stretching',
					type: 'Flexibility',
					durationInMinutes: 10,
					exercisePicture: 'a',
				},
				{
					name: 'Dynamic Stretching',
					type: 'Flexibility',
					durationInMinutes: 8,
					exercisePicture: 'a',
				},
				{
					name: 'Hamstring Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Quadriceps Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Shoulder Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Back Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Hip Flexor Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Calf Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
					exercisePicture: 'a',
				},
				{
					name: 'Calf Stretch',
					type: 'Flexibility',
					durationInMinutes: 5,
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
