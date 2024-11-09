import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import workoutPlaceholder from '../assets/workout-placeholder.jpg';

interface Workout {
	_id: string;
	name: string;
	durationInMinutes: number;
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string;
}

const WorkoutScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [pages, setPages] = useState(1);
	const [activePage, setActivePage] = useState(0);
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const pageNumber = searchParams.get('pageNumber');

	const handleWorkoutRequest = () => {
		let requestURL = '/api/workout/user?';
		if (pageNumber) requestURL = requestURL + `pageNumber=${pageNumber}`;

		axios
			.get(requestURL)
			.then((res) => {
				console.log(res);
				setLoading(false);
				setPages(
					Math.ceil(res.data.workouts ? res.data.workouts.length / 10 : 0),
				);
				setWorkouts(res.data.workouts);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		handleWorkoutRequest();
	}, [searchParams]);

	return isLoading ? (
		<Loader />
	) : (
		<div className="container mx-auto p-4">
			<h2 className="text-4xl font-bold text-center mt-3">My Workouts</h2>
			<div className="rounded-xl justify-center w-full p-2">
				{workouts?.length == 0 ? (
					<h2 className="text-2xl font-bold my-5">No workouts found</h2>
				) : (
					<div className="flex flex-col gap-4">
						<table className="table">
							<thead className="bg-gray-50">
								<tr>
									<th></th>
									<th>Name</th>
									<th>Duration</th>
									<th>Status</th>
									<td className="text-right">
										<Link
											to="/create-workout"
											className="btn btn-sm btn-primary"
										>
											Create a Workout
										</Link>
									</td>
								</tr>
							</thead>
							<tbody>
								{workouts?.map((workout) => (
									<tr key={workout.name}>
										<td>
											<img
												className="w-16 object-cover rounded"
												src={workoutPlaceholder}
												alt=""
											/>
										</td>
										<td>{workout.name}</td>
										<td>{workout.durationInMinutes} minutes</td>
										<td
											className={`mt-8 badge ${
												workout.status === 'Pending'
													? 'badge-warning'
													: workout.status === 'Completed'
													? 'badge-success'
													: 'badge-error'
											}`}
										>
											{workout.status}
										</td>
										<td className="space-x-2">
											<button className="text-white btn btn-success">
												Edit
											</button>
											<button className="text-white btn btn-error">
												Delete
											</button>
										</td>
									</tr>
								))}
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
		</div>
	);
};

export default WorkoutScreen;
