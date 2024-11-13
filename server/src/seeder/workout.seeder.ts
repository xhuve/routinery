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
					name: 'Morning Power HIIT',
					durationInMinutes: 30,
					startTime: new Date('2024-11-05T06:00:00Z'),
					status: 'Pending',
					exercises: [
						'Burpees',
						'Mountain Climbers',
						'Jump Rope',
						'High Knees',
						'Push Up',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Full Body Strength',
					durationInMinutes: 60,
					startTime: new Date('2024-11-05T15:00:00Z'),
					status: 'Completed',
					exercises: [
						'Bench Press',
						'Squat',
						'Deadlift',
						'Pull Up',
						'Shoulder Press',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Core & Cardio Mix',
					durationInMinutes: 45,
					startTime: new Date('2024-11-06T07:30:00Z'),
					status: 'Pending',
					exercises: [
						'Plank',
						'Running',
						'Russian Twist',
						'Jump Rope',
						'Leg Raise',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Upper Body Focus',
					durationInMinutes: 50,
					startTime: new Date('2024-11-06T16:00:00Z'),
					status: 'Pending',
					exercises: [
						'Push Up',
						'Pull Up',
						'Tricep Dip',
						'Bicep Curl',
						'Shoulder Press',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Lower Body Power',
					durationInMinutes: 55,
					startTime: new Date('2024-11-07T08:00:00Z'),
					status: 'Completed',
					exercises: [
						'Squat',
						'Deadlift',
						'Lunges',
						'Box Jump',
						'Calf Stretch',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Recovery Yoga Flow',
					durationInMinutes: 75,
					startTime: new Date('2024-11-07T17:00:00Z'),
					status: 'Pending',
					exercises: [
						'Dynamic Stretching',
						'Static Stretching',
						'Shoulder Stretch',
						'Hip Flexor Stretch',
						'Hamstring Stretch',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Explosive Athletics',
					durationInMinutes: 45,
					startTime: new Date('2024-11-08T06:30:00Z'),
					status: 'Pending',
					exercises: [
						'Box Jump',
						'Burpees',
						'Mountain Climbers',
						'High Knees',
						'Jump Rope',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Strength & Conditioning',
					durationInMinutes: 65,
					startTime: new Date('2024-11-08T15:30:00Z'),
					status: 'Pending',
					exercises: [
						'Bench Press',
						'Pull Up',
						'Deadlift',
						'Running',
						'Plank',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Core Challenge',
					durationInMinutes: 40,
					startTime: new Date('2024-11-09T07:00:00Z'),
					status: 'Pending',
					exercises: [
						'Plank',
						'Sit Up',
						'Russian Twist',
						'Leg Raise',
						'Mountain Climbers',
					].map((name) => exerciseMap.get(name)),
					comments: [],
				},
				{
					name: 'Weekend Warrior',
					durationInMinutes: 90,
					startTime: new Date('2024-11-09T10:00:00Z'),
					status: 'Pending',
					exercises: [
						'Squat',
						'Bench Press',
						'Deadlift',
						'Pull Up',
						'Push Up',
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
