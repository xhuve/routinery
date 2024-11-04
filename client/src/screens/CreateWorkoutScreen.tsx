import { useState } from 'react';
import { Link } from 'react-router-dom';

enum STATUS {
	PENDING = 'Pending',
	CANCELLED = 'Cancelled',
	COMPLETED = 'Completed',
}

export const CreateWorkoutScreen = () => {
	const [workoutData, setWorkoutData] = useState({
		name: '',
		durationInMinutes: 0,
		startTime: '',
		status: STATUS.PENDING,
		exercises: [] as string[],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// ... handle form submission
	};

	return (
		<div className="max-w-2xl mx-auto p-8">
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

				<div className="w-full mt-4">
					<label className="label">
						<span className="label-text">Duration (minutes)</span>
					</label>
					<input
						value={workoutData.durationInMinutes}
						onChange={(e) =>
							setWorkoutData({
								...workoutData,
								durationInMinutes: Number(e.target.value),
							})
						}
						placeholder="Enter duration"
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="form-control w-full mt-4">
					<label className="label">
						<span className="label-text">Start Time</span>
					</label>
					<input
						type="datetime-local"
						value={workoutData.startTime}
						onChange={(e) =>
							setWorkoutData({ ...workoutData, startTime: e.target.value })
						}
						className="input input-bordered w-full"
					/>
				</div>

				<div className="form-control w-full mt-4">
					<label className="label">
						<span className="label-text">Status</span>
					</label>
					<select
						value={workoutData.status}
						onChange={(e) =>
							setWorkoutData({
								...workoutData,
								status: e.target.value as STATUS,
							})
						}
						className="select select-bordered w-full"
					>
						{Object.values(STATUS).map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
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
