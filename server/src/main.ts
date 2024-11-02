import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Workout app')
		.setDescription('The workout API description')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		include: [
			UsersModule,
			WorkoutModule,
			ExerciseModule,
			CommentModule,
			AuthModule,
		],
	});

	SwaggerModule.setup('swagger', app, document);

	console.log('Api Running');
	await app.listen(3000);
}
bootstrap().catch((err) => {
	console.log('🚀 ~ err:', err);
	process.exit(1);
});
