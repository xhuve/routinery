import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import exercisePlaceholder from '../assets/exercise-placeholder.jpg';
import { exerciseStore } from '../zustand/zustand';

const ExerciseScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [exercises, setExercises] = useState([]);
	const [activePage, setActivePage] = useState(0);
	const [type, setActiveType] = useState('All');
	const [width, setWidth] = useState(window.innerWidth);
	const [pages, setPages] = useState(0);
	const [searchParams, setSearchParam] = useSearchParams();
	const setWorkoutExercises = exerciseStore((state) => state.setExercises);
	const exerciseType = searchParams.get('type');
	const pageNumber = searchParams.get('pageNumber');
	const addingToWorkout = searchParams.get('workout');

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleExerciseRequest = () => {
		let requestURL = '/api/exercise?';
		if (exerciseType && exerciseType != 'All')
			requestURL = requestURL + `type=${exerciseType}&`;
		if (pageNumber) requestURL = requestURL + `pageNumber=${pageNumber}`;

		axios
			.get(requestURL)
			.then((res) => {
				console.log(res);
				setLoading(false);
				setExercises(res.data.exercises);
				setPages(Math.ceil(res.data.totalItems / 10));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		handleExerciseRequest();
	}, [searchParams]);

	return isLoading ? (
		<Loader />
	) : (
		<div className="w-full h-full">
			<h2 className="text-4xl font-bold text-center mt-3">Exercises</h2>
			<div className="bg-gray-50 rounded-lg flex mt-5 w-full md:w-[95%] mx-auto p-5">
				{width >= 768 ? (
					<ul className="menu menu-md rounded-box w-56">
						{Array.from(['All', 'Strength', 'Cardio', 'Flexibility']).map(
							(x) => (
								<li>
									<a
										className={`btn ${type === x ? 'btn-active' : ''}`}
										onClick={() => {
											searchParams.set('type', x);
											searchParams.set('pageNumber', '0');
											setSearchParam(searchParams);
											setActiveType(x);
										}}
									>
										{x}
									</a>
								</li>
							),
						)}
					</ul>
				) : null}
				<div className="flex flex-col gap-5 w-full">
					<div className="md:ml-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
						{exercises.map(
							(exercise: { _id: string; name: string; type: string }) => (
								<div className="card bg-base-100 w-56 shadow-xl">
									<figure>
										<img
											className="image-full"
											src={exercisePlaceholder}
											alt="exercise"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">{exercise.name}</h2>
										<p>Type: {exercise.type}</p>
										<div className="card-actions justify-end">
											<button className="btn btn-sm btn-primary">
												More details
											</button>
											{addingToWorkout ? (
												<button
													onClick={() => setWorkoutExercises(exercise._id)}
													className="btn btn-primary"
												>
													Add to workout
												</button>
											) : null}
										</div>
									</div>
								</div>
							),
						)}
					</div>
					<div className="join self-center">
						{[...Array(pages).keys()].map((x) => (
							<a
								className={`join-item btn  ${
									activePage == x ? 'btn-active' : ''
								}`}
								onClick={() => {
									setActivePage(x);
									searchParams.set('pageNumber', x.toString());
									setSearchParam(searchParams);
								}}
							>
								{x}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExerciseScreen;
