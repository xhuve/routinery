import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const ExerciseScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		axios
			.get('/api/exercise')
			.then((res) => {
				console.log(res);
				setLoading(false);
				setExercises(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return isLoading ? (
		<Loader />
	) : (
		<div className="w-full h-full">
			<div className="bg-green-300 flex mt-10 w-[95%] mx-auto p-5">
				<ul className="menu bg-base-200 rounded-box w-56">
					<li>
						<a>Item 1</a>
					</li>
					<li>
						<a>Item 2</a>
					</li>
					<li>
						<a>Item 3</a>
					</li>
				</ul>
				<div className="ml-2 grid grid-cols-5 gap-5">
					{exercises.map((x) => (
						<div className="card bg-base-100 w-56 shadow-xl">
							<figure>
								<img
									src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
									alt="Shoes"
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">Shoes!</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
								<div className="card-actions justify-end">
									<button className="btn btn-primary">Buy Now</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExerciseScreen;
