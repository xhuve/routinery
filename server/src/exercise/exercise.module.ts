import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { Exercise, ExerciseSchema } from 'src/mongoose/entities/Exercise';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Exercise.name, schema: ExerciseSchema },
		]),
	],
	controllers: [ExerciseController],
	providers: [ExerciseService],
})
export class ExerciseModule {}
