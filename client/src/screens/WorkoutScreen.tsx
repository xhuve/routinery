import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';

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
				setWorkouts(res.data.workouts);
				setPages(Math.ceil(res.data.totalWorkouts / 10));
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
			<h2 className="text-4xl font-bold text-center mt-3">Exercises</h2>
			<div className="bg-gray-50 rounded-lg flex mt-5 w-full md:w-[95%] mx-auto p-5">
				<div className="flex flex-col gap-5 w-full">
					<div className="overflow-x-auto">
						<table className="table">
							{/* head */}
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Job</th>
									<th>Favorite Color</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								<tr>
									<th>1</th>
									<td>Cy Ganderton</td>
									<td>Quality Control Specialist</td>
									<td>Blue</td>
								</tr>
								{/* row 2 */}
								<tr>
									<th>2</th>
									<td>Hart Hagerty</td>
									<td>Desktop Support Technician</td>
									<td>Purple</td>
								</tr>
								{/* row 3 */}
								<tr>
									<th>3</th>
									<td>Brice Swyre</td>
									<td>Tax Accountant</td>
									<td>Red</td>
								</tr>
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
			</div>
		</div>
	);
};

export default WorkoutScreen;
