import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

interface Workout {
	_id: string;
	name: string;
	creator: string;
	durationInMinutes: number;
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string;
}

const EditWorkoutScreen = () => {
	const { workoutId } = useParams();
	console.log(workoutId);
	const navigate = useNavigate();

	const [isLoading, setLoading] = useState(true);
	const [workout, setWorkout] = useState<Workout | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		durationInMinutes: 0,
		status: 'Pending' as 'Pending' | 'Completed' | 'Cancelled',
		startTime: '',
		image: '',
	});

	useEffect(() => {
		if (workoutId) {
			axios
				.get(`/api/workout/${workoutId}`)
				.then((res) => {
					const workoutData = res.data;
					console.log('workoutdata------', res);
					setWorkout(workoutData);
					setFormData({
						name: workoutData.name,
						durationInMinutes: workoutData.durationInMinutes,
						status: workoutData.status,
						startTime: workoutData.startTime,
						image: workoutData.image || '',
					});
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					toast.error('Failed to load workout details.');
					setLoading(false);
				});
		}
		console.log(formData);
	}, [workoutId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (workoutId) {
			axios
				.put(`/api/workout/${workoutId}`, formData)
				.then(() => {
					toast.success('Workout updated successfully!');
					navigate('/workouts');
				})
				.catch((err) => {
					console.log(err);
					toast.error('Failed to update workout.');
				});
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!workout) {
		return <div className="text-center text-red-500">Workout not found.</div>;
	}

	return (
		<div className="flex justify-center items-center p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Edit Workout</h2>

				<div className="form-control w-full mb-4">
					<label className="label">
						<span className="label-text">Workout Name</span>
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="form-control w-full mb-4">
					<label className="label">
						<span className="label-text">Duration (minutes)</span>
					</label>
					<input
						type="number"
						name="durationInMinutes"
						value={formData.durationInMinutes}
						onChange={handleChange}
						className="input input-bordered w-full"
						required
						min={1}
					/>
				</div>

				<div className="form-control w-full mb-4">
					<label className="label">
						<span className="label-text">Status</span>
					</label>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="select select-bordered w-full"
						required
					>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
						<option value="Cancelled">Cancelled</option>
					</select>
				</div>

				<div className="form-control w-full mb-6">
					<label className="label">
						<span className="label-text">Workout Image URL</span>
					</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Optional"
					/>
				</div>

				<div className="flex justify-between">
					<button type="submit" className="btn btn-primary">
						Save Changes
					</button>
					<button
						type="button"
						onClick={() => navigate('/workouts')}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditWorkoutScreen;
