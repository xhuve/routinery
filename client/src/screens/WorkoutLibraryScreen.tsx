import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link, useSearchParams } from 'react-router-dom';
import workoutPlaceholder from '../assets/workout-placeholder.jpg';

interface Workout {
	_id: string;
	name: string;
	durationInMinutes: number;
	creator: { username: string };
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string;
}

const WorkoutLibraryScreen = () => {
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [activePage, setActivePage] = useState(0);
	const pageNumber = searchParams.get('pageNumber');

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				let requestURL = `/api/workout?`;
				if (pageNumber) requestURL += `pageNumber=${pageNumber}`;
				const response = await axios.get(requestURL);
				console.log(response);

				setWorkouts(response.data.workouts);
				setFilteredWorkouts(response.data.workouts);
				setPages(Math.ceil(response.data.totalWorkouts / 10));
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching workouts:', error);
				setIsLoading(false);
			}
		};

		fetchWorkouts();
	}, [searchParams]);

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
				<div className="flex flex-col overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Duration (mins)</th>
								<th>Creator</th>
								<th>Status</th>
								<th>Start Time</th>
							</tr>
						</thead>
						<tbody>
							{filteredWorkouts.map((workout) => {
								return (
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
											{workout.creator === null
												? 'Routinery'
												: workout.creator?.username}
										</td>
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
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="join self-center">
						{[...Array(pages).keys()].map((x) => (
							<a
								className={`join-item btn ${
									activePage == x ? 'btn-active' : ''
								}`}
								onClick={() => {
									setActivePage(x);
									setSearchParams({ pageNumber: x.toString() });
								}}
							>
								{x}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default WorkoutLibraryScreen;
