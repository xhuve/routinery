import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { CreateCommentDto } from './dtos/CreateCommentDto';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Get()
	getComments() {
		return this.commentService.getAllComments();
	}

	@Get('/workout/:workoutId')
	getComment(@Param('workoutId') workoutId: string) {
		return this.commentService.getWorkoutComments(workoutId);
	}

	@Post('/workout/:workoutId')
	addWorkoutComment(
		@Param('workoutId') id: string,
		@Body() addCommentDto: CreateCommentDto,
	) {
		return this.commentService.addWorkoutComment(id, addCommentDto);
	}

	@Delete(':commentId')
	deleteComment(@Param('commentId') commentId: string) {
		this.commentService.deleteComment(commentId);
	}
}
