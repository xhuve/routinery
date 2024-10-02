import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Exercise } from './typeorm/entities/Exercise';
import { Workout } from './typeorm/entities/Workout';
import { Comment } from './typeorm/entities/Comment';
import { ExerciseModule } from './exercise/exercise.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [
		WorkoutModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'a',
			database: 'workout_app',
			entities: [User, Exercise, Workout, Comment],
			synchronize: true,
		}),
		UsersModule,
		ExerciseModule,
		CommentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
