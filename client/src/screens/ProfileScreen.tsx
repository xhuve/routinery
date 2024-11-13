import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { userStore } from '../zustand/zustand';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
	const user = userStore((state) => state.user);
	const setUser = userStore((state) => state.setUser);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		gender: '',
		profilePicture: '',
	});

	useEffect(() => {
		if (user) {
			setFormData({
				username: user.username,
				email: user.email,
				password: '',
				gender: user.gender,
				profilePicture: user.profilePicture,
			});
		}
	}, [user]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.put(`/api/users/${user?._id}`, formData);
			navigate('/');
			toast.success('Profile updated successfully!');
			setUser(response.data);
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message || 'Failed to update profile.',
			);
			console.error(error);
		}
	};

	if (!user) {
		return <div className="text-center mt-5">Loading...</div>;
	}

	return (
		<div className="flex justify-center items-center p-4">
			<div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="mt-1 p-2 border border-gray-300 rounded w-full"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 p-2 border border-gray-300 rounded w-full"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 p-2 border border-gray-300 rounded w-full"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Gender
						</label>
						<select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							className="mt-1 p-2 border border-gray-300 rounded w-full"
						>
							<option value="">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Profile Picture URL
						</label>
						<input
							type="text"
							name="profilePicture"
							value={formData.profilePicture}
							onChange={handleChange}
							className="mt-1 p-2 border border-gray-300 rounded w-full"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					>
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProfileScreen;
