import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from 'src/typeorm/entities/Workout';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutController } from './workout.controller';
import { Comment } from 'src/typeorm/entities/Comment';
import { Exercise } from 'src/typeorm/entities/Exercise';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise, Comment])],
  controllers: [WorkoutController],
  providers: [WorkoutService]
})
export class WorkoutModule {}
