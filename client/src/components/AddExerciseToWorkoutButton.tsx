import { exerciseStore } from '../zustand/zustand';

const AddExerciseToWorkoutButton = ({ exerciseId }: { exerciseId: string }) => {
	const setWorkoutExercises = exerciseStore((state) => state.setExercise);

	return (
		<button
			onClick={() => setWorkoutExercises(exerciseId)}
			className="btn btn-primary"
		>
			Add
		</button>
	);
};

export default AddExerciseToWorkoutButton;
