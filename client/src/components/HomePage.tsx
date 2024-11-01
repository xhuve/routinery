import { Link } from 'react-router-dom';

const HomePage = ({ user }: { user: { username: string } }) => {
	return (
		<div className="justify-center bg-base-200 h-full">
			<div className="hero min-h-[30vh] bg-base-100">
				<div className="hero-content text-center">
					<div>
						<h1 className="text-5xl font-bold">Welcome {user?.username}</h1>
						<p className="py-6">Start your fitness journey today!</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto">
				<div className="card w-full lg:w-1/2 bg-primary text-primary-content hover:shadow-xl transition-shadow">
					<div className="card-body items-center text-center">
						<h2 className="card-title text-3xl">Workouts</h2>
						<p>Create and track your workouts</p>
						<div className="card-actions justify-end">
							<Link className="btn btn-white" to="/workouts">
								View Workouts
							</Link>
						</div>
					</div>
				</div>

				<div className="card w-full lg:w-1/2 bg-secondary text-secondary-content hover:shadow-xl transition-shadow">
					<div className="card-body items-center text-center">
						<h2 className="card-title text-3xl">Exercises</h2>
						<p>Browse exercise library</p>
						<div className="card-actions justify-end">
							<Link className="btn btn-white" to="/exercises">
								View Exercises
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<div className="stats shadow mx-auto max-w-6xl my-6">
					<div className="stat">
						<div className="stat-title">Total Workouts</div>
						<div className="stat-value">0</div>
					</div>

					<div className="stat">
						<div className="stat-title">Active Streak</div>
						<div className="stat-value">0</div>
					</div>

					<div className="stat">
						<div className="stat-title">Personal Records</div>
						<div className="stat-value">0</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
