import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workout, WorkoutDocument } from 'src/mongoose/entities/Workout';

@Injectable()
export class WorkoutSeeder {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
	) {}

	async seedWorkout() {
		try {
			const count = await this.workoutModel.countDocuments();
			if (count > 0) return;

			const workoutSeedData = [
				{
					name: 'Morning Cardio Blast',
					durationInMinutes: 45,
					creator: 'admin',
					startTime: new Date('2024-11-05T06:00:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Strength Training Circuit',
					durationInMinutes: 60,
					creator: new Types.ObjectId(),
					startTime: new Date('2024-11-05T18:00:00Z'),
					status: 'Completed',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Evening Yoga Session',
					durationInMinutes: 30,
					creator: 'admin',
					startTime: new Date('2024-11-06T20:00:00Z'),
					status: 'Cancelled',
					exercises: [new Types.ObjectId()],
					comments: [new Types.ObjectId(), new Types.ObjectId()],
				},
				{
					name: 'HIIT Power Hour',
					durationInMinutes: 60,
					creator: 'trainer_jane',
					startTime: new Date('2024-11-07T07:30:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Full Body Stretch',
					durationInMinutes: 20,
					creator: 'admin',
					startTime: new Date('2024-11-07T10:00:00Z'),
					status: 'Completed',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Lunchtime Core Workout',
					durationInMinutes: 30,
					creator: 'fit_fanatic',
					startTime: new Date('2024-11-07T12:00:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Evening Relaxation Yoga',
					durationInMinutes: 45,
					creator: new Types.ObjectId(),
					startTime: new Date('2024-11-07T19:00:00Z'),
					status: 'Cancelled',
					exercises: [new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Upper Body Strength',
					durationInMinutes: 50,
					creator: 'trainer_sam',
					startTime: new Date('2024-11-08T08:00:00Z'),
					status: 'Completed',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Quick Morning Routine',
					durationInMinutes: 15,
					creator: 'admin',
					startTime: new Date('2024-11-08T06:30:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Full-Body Cardio',
					durationInMinutes: 60,
					creator: 'admin',
					startTime: new Date('2024-11-09T09:00:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Power Lifting Session',
					durationInMinutes: 90,
					creator: 'strength_coach',
					startTime: new Date('2024-11-09T15:00:00Z'),
					status: 'Completed',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Evening Cardio Burnout',
					durationInMinutes: 40,
					creator: 'cardio_king',
					startTime: new Date('2024-11-09T18:30:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Advanced Yoga Flow',
					durationInMinutes: 75,
					creator: 'yoga_guru',
					startTime: new Date('2024-11-10T07:00:00Z'),
					status: 'Completed',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId(), new Types.ObjectId()],
				},
				{
					name: 'Dynamic Strength Training',
					durationInMinutes: 55,
					creator: 'trainer_jane',
					startTime: new Date('2024-11-10T17:00:00Z'),
					status: 'Cancelled',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Morning Meditation & Stretch',
					durationInMinutes: 25,
					creator: 'meditation_master',
					startTime: new Date('2024-11-11T06:15:00Z'),
					status: 'Completed',
					exercises: [],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Afternoon Mobility Session',
					durationInMinutes: 40,
					creator: 'mobility_pro',
					startTime: new Date('2024-11-11T13:00:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Evening Bootcamp',
					durationInMinutes: 60,
					creator: 'admin',
					startTime: new Date('2024-11-11T18:30:00Z'),
					status: 'Completed',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Late Night Yoga',
					durationInMinutes: 30,
					creator: new Types.ObjectId(),
					startTime: new Date('2024-11-12T22:00:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Circuit Training',
					durationInMinutes: 45,
					creator: 'trainer_sam',
					startTime: new Date('2024-11-12T10:30:00Z'),
					status: 'Cancelled',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Cardio & Strength Combo',
					durationInMinutes: 70,
					creator: 'admin',
					startTime: new Date('2024-11-13T08:00:00Z'),
					status: 'Completed',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId(), new Types.ObjectId()],
				},
				{
					name: 'High-Intensity Core',
					durationInMinutes: 35,
					creator: 'admin',
					startTime: new Date('2024-11-14T07:00:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Recovery and Mobility',
					durationInMinutes: 40,
					creator: 'admin',
					startTime: new Date('2024-11-14T15:30:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [new Types.ObjectId()],
				},
				{
					name: 'Endurance Training',
					durationInMinutes: 90,
					creator: 'admin',
					startTime: new Date('2024-11-15T08:00:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [],
				},
				{
					name: 'Functional Fitness',
					durationInMinutes: 50,
					creator: 'admin',
					startTime: new Date('2024-11-15T16:00:00Z'),
					status: 'Pending',
					exercises: [new Types.ObjectId(), new Types.ObjectId()],
					comments: [],
				},
				{
					name: 'Weekend Warriors Workout',
					durationInMinutes: 75,
					creator: 'admin',
					startTime: new Date('2024-11-16T09:00:00Z'),
					status: 'Pending',
					exercises: [
						new Types.ObjectId(),
						new Types.ObjectId(),
						new Types.ObjectId(),
					],
					comments: [new Types.ObjectId()],
				},
			];
			this.workoutModel.insertMany(workoutSeedData);
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
