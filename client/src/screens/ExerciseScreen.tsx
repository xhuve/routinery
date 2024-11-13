import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { Link, useSearchParams } from 'react-router-dom';
import exercisePlaceholder from '../assets/exercise-placeholder.jpg';
import { exerciseStore } from '../zustand/zustand';
import RemoveExerciseFromWorkoutButton from '../components/RemoveExerciseFromWorkoutButton';
import AddExerciseToWorkoutButton from '../components/AddExerciseToWorkoutButton';
import ExercisesCard from '../components/ExercisesCard';
import Popup from 'reactjs-popup';

const ExerciseScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [exercises, setExercises] = useState([]);
	const [type, setActiveType] = useState('All');
	const [width, setWidth] = useState(window.innerWidth);
	const [pages, setPages] = useState(0);
	const [searchParams, setSearchParam] = useSearchParams();
	const workoutExercises = exerciseStore((state) => state.exercises);
	const exerciseType = searchParams.get('type');
	const pageNumber = searchParams.get('pageNumber');
	const [activePage, setActivePage] = useState(
		pageNumber ? parseInt(pageNumber) : 0,
	);
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
		console.log(workoutExercises);
	}, [searchParams]);

	if (isLoading) return <Loader />;

	return (
		<div className="w-full h-full">
			<h2 className="text-4xl font-bold mt-3">
				<div className="text-center">Exercises</div>
			</h2>
			{addingToWorkout && (
				<Link
					to="/create-workout"
					className="btn  btn-secondary btn-outline ml-5"
				>
					Go Back
				</Link>
			)}
			<div className="bg-gray-50 rounded-lg flex mt-5 w-full md:w-[95%] mx-auto p-5">
				<div className=""></div>
				{width >= 768 ? (
					<ul className="menu menu-md rounded-box w-48">
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
				{/* <ExercisesCard /> */}
				<div className="flex flex-col gap-7 w-full">
					<div className="md:ml-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
						{exercises.map(
							(exercise: {
								_id: string;
								name: string;
								type: string;
								durationInMinutes: number;
							}) => (
								<>
									<div className="card bg-base-100 shadow-lg">
										<figure>
											<img
												className="image-full"
												src={exercisePlaceholder}
												alt="exercise"
											/>
										</figure>
										<div className="card-body">
											<div className="card-title flex justify-between">
												<h2>{exercise.name}</h2>
												{addingToWorkout &&
												workoutExercises?.includes(exercise._id) ? (
													<div className="w-7 h-7 rounded-full text-sm flex justify-center items-center bg-primary text-white">
														{workoutExercises.indexOf(exercise._id) + 1}
													</div>
												) : null}
											</div>
											<div className="card-body p-0">
												<p>Type: {exercise.type}</p>
												<Popup
													trigger={
														<a className="font-semibold underline cursor-pointer">
															More details
														</a>
													}
													position="top center"
												>
													<ExercisesCard workoutExercise={exercise} />
												</Popup>
											</div>
											<div className="card-actions align-bottom">
												{addingToWorkout &&
													(!workoutExercises?.includes(exercise._id) ? (
														<AddExerciseToWorkoutButton
															exerciseId={exercise._id}
														/>
													) : (
														<RemoveExerciseFromWorkoutButton
															exerciseId={exercise._id}
														/>
													))}
											</div>
										</div>
									</div>
								</>
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
