import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from 'src/typeorm/entities/Workout';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutController } from './workout.controller';
import { Comment } from 'src/typeorm/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Comment])],
  controllers: [WorkoutController],
  providers: [WorkoutService]
})
export class WorkoutModule {}
