import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import defaultExerciseImage from '../assets/exercise-placeholder.jpg';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

interface Exercise {
	image: any;
	_id: string;
	name: string;
	durationInMinutes: number;
}

const StartWorkoutScreen = () => {
	const { workoutId } = useParams<{ workoutId: string }>();
	const [isLoading, setLoading] = useState(true);
	const [workout, setWorkout] = useState<{
		name: string;
		exercises: Exercise[];
		durationInMinutes: number;
	} | null>(null);
	const navigate = useNavigate();
	const [start, setStart] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
	const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0);

	useEffect(() => {
		if (workoutId) {
			axios
				.get(`/api/workout/${workoutId}`)
				.then((res) => {
					setWorkout(res.data);
					setCurrentExercise(res.data.exercises[0]);
					setExerciseTimeLeft(5);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					toast.error('Failed to load workout.');
					setLoading(false);
				});
		}
	}, [workoutId]);

	useEffect(() => {
		if (!workout) {
			return;
		}

		if (workout.exercises[currentExerciseIndex] == null && start) {
			setIsCompleted(true);
			const timer = setInterval(() => {
				toast.success('Workout completed, redirecting');
				navigate('/workouts');
			}, 4000);
			return () => clearInterval(timer);
		} else if (start) {
			const timer = setInterval(() => {
				if (exerciseTimeLeft <= 1) {
					setCurrentExercise(workout.exercises[currentExerciseIndex + 1]);
					setExerciseTimeLeft(
						workout.exercises[currentExerciseIndex + 1].durationInMinutes,
					);
				} else {
					setExerciseTimeLeft((prev) => prev - 1);
				}
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [exerciseTimeLeft, start, currentExercise]);

	if (isLoading) {
		return <Loader />;
	}

	if (!workout) {
		return <div className="text-center mt-5">Workout not found.</div>;
	}

	const currentExerciseIndex = workout.exercises.indexOf(
		currentExercise as Exercise,
	);

	return (
		<div className="flex flex-col items-center p-6">
			<h2 className="text-3xl font-bold mb-4">Starting: {workout.name}</h2>
			<button
				className={`btn ${
					start ? 'btn-error' : 'btn-primary'
				} w-72 max-w-md mb-5`}
				onClick={() => setStart((prev) => !prev)}
			>
				{start ? 'Stop' : 'Start'}
			</button>

			{isCompleted ? (
				<div className="card w-full max-w-md bg-success  text-success-content shadow-xl mb-4">
					<div className="card-body text-center">
						<h3 className="card-title text-2xl justify-center mb-4">
							🎉 Good job! 🎉
						</h3>
						<p className="text-xl mb-2">You've completed {workout.name}!</p>
						<p>Total workout time: {workout.durationInMinutes} minutes</p>
						<div className="mt-4">
							<button
								className="btn btn-primary"
								onClick={() => navigate('/workouts')}
							>
								Back to Workouts
							</button>
						</div>
					</div>
				</div>
			) : currentExercise ? (
				<div className="card w-full max-w-md bg-base-50 shadow-xl mb-4">
					<div className="card-body">
						<h3 className="card-title">{currentExercise.name}</h3>
						<img
							src={currentExercise.image || defaultExerciseImage}
							alt={currentExercise.name}
							className=""
						/>
						<p>Duration: {currentExercise.durationInMinutes} minutes</p>
						<div className="flex items-center">
							<span className="mr-2 text-xl font-semibold">Time Left:</span>
							<span className="text-xl">{exerciseTimeLeft} seconds</span>
						</div>
						<progress
							className="progress"
							value={0}
							style={{ width: `${(exerciseTimeLeft / 5) * 100}%` }}
						></progress>
					</div>
				</div>
			) : (
				<div className="text-2xl mb-6">Preparing your workout...</div>
			)}

			<div className="w-full max-w-md">
				{workout.exercises.map((exercise, index) => (
					<div
						key={exercise._id}
						className={`card mb-2 ${
							start
								? index === currentExerciseIndex
									? 'border-4 border-primary'
									: index < currentExerciseIndex
									? 'opacity-50'
									: ''
								: 'opacity-50'
						}`}
					>
						<div className="card-body flex justify-between">
							<span>{exercise.name}</span>
							<span>{exercise.durationInMinutes} min</span>
						</div>
					</div>
				))}
			</div>

			{!isCompleted && (
				<button
					className="btn btn-secondary mt-4"
					onClick={() => navigate('/workouts')}
				>
					Cancel
				</button>
			)}
		</div>
	);
};

export default StartWorkoutScreen;
