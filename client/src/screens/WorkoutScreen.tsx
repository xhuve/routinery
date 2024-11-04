import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import workoutPlaceholder from '../assets/workout-placeholder.jpg';

const WorkoutScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [pages, setPages] = useState(1);
	const [activePage, setActivePage] = useState(0);
	const [workouts, setWorkouts] = useState([]);
	const pageNumber = searchParams.get('pageNumber');

	const handleWorkoutRequest = () => {
		let requestURL = '/api/workout?';
		if (pageNumber) requestURL = requestURL + `pageNumber=${pageNumber}`;

		axios
			.get(requestURL)
			.then((res) => {
				console.log(res);
				setLoading(false);
				setPages(Math.ceil(res.data.totalWorkouts / 10));
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
		<div className="w-full h-full">
			<h2 className="text-4xl font-bold text-center mt-3">My Workouts</h2>
			<div className="bg-gray-50 rounded-lg flex justify-center mt-5 w-full md:w-[95%] mx-auto p-5">
				{workouts.length == 0 ? (
					<h2 className="text-2xl font-bold mt-5">No workouts found</h2>
				) : (
					<div className="flex flex-col gap-5 w-full">
						<div className="overflow-x-auto">
							<table className="table border-l-neutral-900">
								<thead>
									<tr>
										<th></th>
										<th>Name</th>
										<th>Duration</th>
										<th>Status</th>
										<td className="text-right">
											<Link
												to="/create-workout"
												className="text-white btn btn-success"
											>
												Create Workout
											</Link>
										</td>
									</tr>
								</thead>
								<tbody>
									{workouts.map(
										(workout: {
											name: string;
											durationInMinutes: number;
											status: string;
										}) => (
											<tr>
												<td>
													<img
														className="w-24"
														src={workoutPlaceholder}
														alt=""
													/>
												</td>
												<td>{workout.name}</td>
												<td>{workout.durationInMinutes} minutes</td>
												<td
													className={`font-semibold ${
														workout.status === 'Pending'
															? 'text-gray-600'
															: workout.status === 'Completed'
															? 'text-green-500'
															: 'text-red-500'
													} `}
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
										),
									)}
								</tbody>
							</table>
						</div>

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
