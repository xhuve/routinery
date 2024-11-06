import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import workoutPlaceholder from '../assets/workout-placeholder.jpg'; // Ensure you have a placeholder image

interface Workout {
	_id: string;
	name: string;
	durationInMinutes: number;
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string; // Optional image field
}

const WorkoutLibraryScreen = () => {
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await axios.get('/api/workout');
				setWorkouts(response.data.workouts);
				setFilteredWorkouts(response.data.workouts);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching workouts:', error);
				setIsLoading(false);
			}
		};

		fetchWorkouts();
	}, []);

	useEffect(() => {
		const results = workouts.filter((workout) =>
			workout.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setFilteredWorkouts(results);
	}, [searchQuery, workouts]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-3xl font-bold mb-4 text-center">Workout Library</h2>

			<div className="flex justify-between mb-4">
				<input
					type="text"
					placeholder="Search Workouts..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="input input-bordered w-full max-w-xs"
				/>
				<Link to="/create-workout" className="btn btn-primary ml-4">
					Create your own Workout
				</Link>
			</div>

			{filteredWorkouts.length === 0 ? (
				<div className="text-center text-xl">No workouts found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Duration (mins)</th>
								<th>Status</th>
								<th>Start Time</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredWorkouts.map((workout) => (
								<tr key={workout._id}>
									<td>
										<img
											src={workout.image || workoutPlaceholder}
											alt={workout.name}
											className="w-16 h-16 object-cover rounded"
										/>
									</td>
									<td>{workout.name}</td>
									<td>{workout.durationInMinutes}</td>
									<td>
										<span
											className={`badge ${
												workout.status === 'Completed'
													? 'badge-success'
													: workout.status === 'Pending'
													? 'badge-warning'
													: 'badge-error'
											}`}
										>
											{workout.status}
										</span>
									</td>
									<td>{new Date(workout.startTime).toLocaleString()}</td>
									<td>
										<Link
											to={`/workouts/${workout._id}`}
											className="btn btn-sm btn-info mr-2"
										>
											View
										</Link>
										<Link
											to={`/workouts/edit/${workout._id}`}
											className="btn btn-sm btn-secondary"
										>
											Edit
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default WorkoutLibraryScreen;
