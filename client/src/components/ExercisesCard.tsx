const ExercisesCard = ({
	workoutExercise,
}: {
	workoutExercise: {
		name: string;
		durationInMinutes: number;
		type: string;
	};
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
			<div className="flex flex-col gap-3">
				<h3 className="text-lg font-semibold text-gray-800">
					{workoutExercise.name}
				</h3>
				<p className="text-gray-600">Exercise description goes here</p>
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<span>Duration: {workoutExercise.durationInMinutes} min</span>
					<span>•</span>
					<span>Type: {workoutExercise.type}</span>
				</div>
			</div>
		</div>
	);
};

export default ExercisesCard;
