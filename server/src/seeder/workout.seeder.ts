import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workout, WorkoutDocument } from 'src/mongoose/entities/Workout';
import { Exercise, ExerciseDocument } from 'src/mongoose/entities/Exercise';

@Injectable()
export class WorkoutSeeder {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
		@InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
	) {}

	async createExerciseMap() {
		const exercises = await this.exerciseModel.find().exec();
		const exerciseMap = new Map();

		exercises.forEach((exercise) => {
			exerciseMap.set(exercise.name, exercise._id);
		});

		return exerciseMap;
	}

	async seedWorkout() {
		try {
			const count = await this.workoutModel.countDocuments();
			if (count > 0) return;

			const exerciseMap = await this.createExerciseMap();
			const workoutSeedData = [
				{
					name: 'Full Body Strength',
					durationInMinutes: 60,
					startTime: new Date('2024-11-05T06:00:00Z'),
					status: 'Pending',
					exercises: [
						'Push Up',
						'Squat',
						'Bench Press',
						'Deadlift',
						'Pull Up',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Cardio Circuit',
					durationInMinutes: 45,
					startTime: new Date('2024-11-05T18:00:00Z'),
					status: 'Completed',
					exercises: [
						'Running',
						'Jump Rope',
						'Burpees',
						'Mountain Climbers',
						'High Knees',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Upper Body Focus',
					durationInMinutes: 50,
					startTime: new Date('2024-11-06T20:00:00Z'),
					status: 'Pending',
					exercises: [
						'Push Up',
						'Bench Press',
						'Shoulder Press',
						'Tricep Dip',
						'Bicep Curl',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Flexibility & Recovery',
					durationInMinutes: 40,
					startTime: new Date('2024-11-07T07:30:00Z'),
					status: 'Pending',
					exercises: [
						'Static Stretching',
						'Dynamic Stretching',
						'Hamstring Stretch',
						'Hip Flexor Stretch',
						'Shoulder Stretch',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Lower Body Power',
					durationInMinutes: 55,
					startTime: new Date('2024-11-07T10:00:00Z'),
					status: 'Completed',
					exercises: [
						'Squat',
						'Deadlift',
						'Lunges',
						'Calf Stretch',
						'Box Jump',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
			];
			await this.workoutModel.insertMany(workoutSeedData);
		} catch (error) {
			console.log(error);
		}
	}

	async removeWorkout() {
		try {
			await this.workoutModel.deleteMany({});
		} catch (error) {
			console.log(error);
		}
	}
}
