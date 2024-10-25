import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './mongoose/entities/User';
import { UsersModule } from './users/users.module';
import { Exercise } from './mongoose/entities/Exercise';
import { Workout } from './mongoose/entities/Workout';
import { Comment } from './mongoose/entities/Comment';
import { ExerciseModule } from './exercise/exercise.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		WorkoutModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		ExerciseModule,
		CommentModule,
		AuthModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
