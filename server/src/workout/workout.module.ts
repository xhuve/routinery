import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from 'src/mongoose/entities/Workout';
import { Exercise, ExerciseSchema } from 'src/mongoose/entities/Exercise';
import { Comment, CommentSchema } from 'src/mongoose/entities/Comment';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Exercise.name, schema: ExerciseSchema },
			{ name: Workout.name, schema: WorkoutSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
	],
	controllers: [WorkoutController],
	providers: [WorkoutService],
	exports: [WorkoutService],
})
export class WorkoutModule {}