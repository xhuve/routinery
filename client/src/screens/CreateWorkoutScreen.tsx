import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { exerciseStore, userStore } from '../zustand/zustand';
import toast from 'react-hot-toast';

enum STATUS {
	PENDING = 'Pending',
	CANCELLED = 'Cancelled',
	COMPLETED = 'Completed',
}

export const CreateWorkoutScreen = () => {
	const exercises = exerciseStore((state) => state.exercises);
	const user = userStore((state) => state.user);

	const [workoutData, setWorkoutData] = useState({
		name: '',
		durationInMinutes: 0,
		startTime: '',
		status: STATUS.PENDING,
		exercises: [] as string[],
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!exercises?.length)
			return toast.error('Cannot create workout without exercises');

		try {
			console.log(exercises);

			const workoutWithExercises = {
				...workoutData,
				exercises: exercises,
			};

			axios.post('/api/workout', {
				...workoutWithExercises,
				creator: user?._id,
			}),
				toast.success('Workout created successfully');
		} catch (error: any) {
			console.log(error);
			toast.error(error?.response?.data?.message || 'failed to create workout');
		}
	};

	return (
		<div className="max-w-2xl w-full mx-auto p-8">
			<h2 className="text-2xl font-bold text-center mb-8">
				Create New Workout
			</h2>

			<form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Workout Name</span>
					</label>
					<input
						type="text"
						value={workoutData.name}
						onChange={(e) =>
							setWorkoutData({ ...workoutData, name: e.target.value })
						}
						placeholder="Enter workout name"
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="w-full flex flex-col mt-4">
					<label className="label">
						<span className="label-text">Upload Image</span>
					</label>
					<input
						type="file"
						placeholder="Enter duration"
						className="input input-bordered file: file:p-3
						file:rounded-full file:border-0 file:text-sm
						file:font-semibold file:text-secondary hover:file:bg-violet-100"
					/>
				</div>

				<div className="form-control w-full mt-4">
					<label className="label">
						<span className="label-text">Exercises</span>
					</label>
					<Link
						type="button"
						to={'/exercises?workout=true'}
						className="btn btn-outline btn-secondary"
					>
						Add Exercises
					</Link>
				</div>

				<button type="submit" className="btn btn-primary mt-6">
					Create Workout
				</button>
			</form>
		</div>
	);
};
