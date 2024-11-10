import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import workoutPlaceholder from '../assets/workout-placeholder.jpg';
import WorkoutTable from '../components/WorkoutTable';

interface Workout {
	_id: string;
	name: string;
	creator: string;
	durationInMinutes: number;
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string;
}

const WorkoutScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [pages, setPages] = useState(1);
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const pageNumber = searchParams.get('pageNumber');
	const [activePage, setActivePage] = useState(
		pageNumber ? parseInt(pageNumber) : 0,
	);

	const handleWorkoutRequest = () => {
		let requestURL = '/api/workout/user?';
		if (pageNumber) requestURL += `pageNumber=${pageNumber}`;

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
		<div className="flex flex-col p-4">
			<header className="flex justify-between items-center mb-4">
				<h2 className="text-4xl ml-2 font-bold">My Workouts</h2>
				<Link to="/create-workout" className="btn btn-primary">
					Create a Workout
				</Link>
			</header>
			<div className="rounded-xl w-full p-2 flex flex-col">
				{workouts.length === 0 ? (
					<h2 className="text-2xl font-bold text-center my-5">
						No workouts found
					</h2>
				) : (
					<>
						<WorkoutTable
							workouts={workouts}
							placeholder={workoutPlaceholder}
						/>
						<div className="join self-center">
							{[...Array(pages).keys()].map((x) => (
								<a
									className={`join-item btn  ${
										activePage == x ? 'btn-active' : ''
									}`}
									onClick={() => {
										setActivePage(x);
										searchParams.set('pageNumber', x.toString());
										setSearchParams(searchParams);
									}}
								>
									{x}
								</a>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default WorkoutScreen;
