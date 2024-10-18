import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { In, Repository } from 'typeorm';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { Comment } from 'src/typeorm/entities/Comment';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectRepository(Workout) private workoutRepo: Repository<Workout>,
		@InjectRepository(Exercise) private exerciseRepo: Repository<Exercise>,
		@InjectRepository(Comment) private commentRepo: Repository<Comment>,
	) {}

	getWorkouts() {
		return this.workoutRepo.find({
			relations: ['exercises', 'comments'],
		});
	}

	getWorkoutById(workoutId: number) {
		return this.workoutRepo.findOneBy({ id: workoutId });
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exercises = await this.exerciseRepo.findBy({
			id: In(newWorkout.exercises || []),
		});
		const comments = await this.commentRepo.findBy({
			id: In(newWorkout.comments || []),
		});

		const workout = this.workoutRepo.create({
			...newWorkout,
			exercises,
			comments,
		});
		return await this.workoutRepo.save(workout);
	}

	async deleteWorkout(id: number) {
		await this.workoutRepo.delete(id);
	}
}
