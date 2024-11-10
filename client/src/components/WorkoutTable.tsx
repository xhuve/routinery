import React from 'react';
import { Link } from 'react-router-dom';

interface Workout {
	_id: string;
	name: string;
	creator: string;
	durationInMinutes: number;
	status: 'Pending' | 'Completed' | 'Cancelled';
	startTime: string;
	image?: string;
}

interface WorkoutTableProps {
	workouts: Workout[];
	placeholder: string;
	handleDelete: (workoutId: string) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({
	workouts,
	placeholder,
	handleDelete,
}) => (
	<table className="min-w-full table-auto">
		<thead className="bg-gray-50">
			<tr>
				<th className="px-4 py-2 text-center">Image</th>
				<th className="px-4 py-2 text-center">Name</th>
				<th className="px-4 py-2 text-center">Duration</th>
				<th className="px-4 py-2 text-center">Status</th>
				{workouts.some((x) => x.creator) && (
					<th className="px-4 py-2 text-center">Actions</th>
				)}
			</tr>
		</thead>
		<tbody>
			{workouts.map((workout) => (
				<tr key={workout._id} className="border-t">
					<td className="px-4 py-2 text-center">
						<img
							src={placeholder}
							alt={workout.name}
							className="w-16 h-16 object-cover rounded"
						/>
					</td>
					<td className="px-4 py-2 text-center">{workout.name}</td>
					<td className="px-4 py-2 text-center">
						{workout.durationInMinutes} minutes
					</td>
					<td className="px-4 py-2 text-center">
						<span
							className={`badge font-semibold ${
								workout.status === 'Pending'
									? 'badge-warning'
									: workout.status === 'Completed'
									? 'badge-success'
									: 'badge-error'
							}`}
						>
							{workout.status}
						</span>
					</td>
					{workout.creator && (
						<td className="px-4 py-2 text-center">
							<div className="flex justify-center space-x-2">
								<Link
									to={`/edit-workout/${workout._id}`}
									className="btn mx-1 btn-success text-white"
								>
									Edit
								</Link>
								<button
									className="btn btn-error text-white"
									onClick={() => handleDelete(workout._id)}
								>
									Delete
								</button>
							</div>
						</td>
					)}
				</tr>
			))}
		</tbody>
	</table>
);

export default WorkoutTable;
