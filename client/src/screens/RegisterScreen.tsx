import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStore } from '../zustand/zustand';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
	const [registerForm, setRegisterForm] = useState({});
	const setUser = useStore((state) => state.setUser);

	const handleInputChanges = (e: {
		target: { value: string; name: string };
	}) => {
		setRegisterForm((form) => ({ ...form, [e.target.name]: e.target.value }));
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		console.log(registerForm);
		axios
			.post('api/auth/register', registerForm)
			.then((res) => {
				console.log(res);
				toast.success('Successfully registered!');
				setUser(res.data);
			})
			.catch((err) => {
				const err_msg = Array.isArray(err?.response?.data?.message)
					? err?.response?.data?.message[0]
					: err?.response?.data?.message || err.message;
				toast.error(err_msg);
				console.log(err);
			});
	};

	return (
		<>
			<div className="flex flex-col h-[80vh] justify-center items-center p-1 min-w-[400px]">
				<div className="w-[90%] md:w-[400px] p-8 shadow-md rounded-md bg-white">
					<form onSubmit={submitHandler} className="space-y-4">
						<h1 className="text-lg md:text-3xl text-center font-bold mb-2">
							Register
						</h1>
						<div>
							<label className="text-sm md:text-lg">Username</label>
							<input
								type="text"
								name="username"
								onChange={handleInputChanges}
								className="input input-sm input-bordered w-full text-sm md:text-md"
							/>
						</div>
						<div>
							<label className="text-sm md:text-lg">Email</label>
							<input
								type="text"
								name="email"
								onChange={handleInputChanges}
								className="input input-sm input-bordered w-full text-sm md:text-md"
							/>
						</div>
						<div>
							<label className="text-sm md:text-lg">Password</label>
							<input
								type="password"
								name="password"
								onChange={handleInputChanges}
								className="input input-sm input-bordered w-full text-sm md:text-md"
							/>
						</div>
						<div>
							<div className="flex space-x-4 mt-2">
								<div className="flex items-center">
									<input
										type="radio"
										name="gender"
										value="boy"
										onChange={handleInputChanges}
										className="radio radio-success"
									/>
									<label className="ml-2">Male</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										name="gender"
										value="girl"
										onChange={handleInputChanges}
										className="radio radio-success"
									/>
									<label className="ml-2">Female</label>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-sm btn-success text-white w-full mt-4 text-sm md:text-md"
						>
							Register
						</button>
						<p className="text-sm">
							Already have an account?{' '}
							<Link className="link" to="/login">
								Click here!
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default RegisterScreen;
