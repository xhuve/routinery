import { exerciseStore } from '../zustand/zustand';

const RemoveExerciseFromWorkoutButton = ({
	exerciseId,
}: {
	exerciseId: string;
}) => {
	const removeExercise = exerciseStore((state) => state.removeExercise);

	return (
		<button
			onClick={() => removeExercise(exerciseId)}
			className="btn btn-outline btn-error"
		>
			Remove from workout
		</button>
	);
};

export default RemoveExerciseFromWorkoutButton;
