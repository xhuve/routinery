import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { userStore } from '../zustand/zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
	const nav = useNavigate();
	const user = userStore((state) => state.user);
	const removeUser = userStore((state) => state.removeUser);

	const handleLogout = () => {
		console.log('test');
		axios
			.get('api/auth/logout', { withCredentials: true })
			.then((res) => {
				console.log(res);
				toast.success(res.data);
				removeUser();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="navbar flex items-center justify-between bg-primary h-16 w-full px-2">
				<Link to="/">
					<img src={logo} className="h-12 w-16" />
				</Link>
				{user ? (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img src={user.profilePicture} />
							</div>
						</div>
						<ul className="menu menu-sm font-normal dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
							<li>
								<Link className="text-lg" to={'/profile'}>
									Profile
								</Link>
							</li>
							<li>
								<button className="text-lg" onClick={handleLogout}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : (
					<div className="flex gap-3">
						<button
							className="btn btn-ghost text-base text-white hover:bg-white hover:text-green-500"
							onClick={() => nav('/login')}
						>
							Log in
						</button>
						<button
							className="btn btn-ghost text-base text-white hover:bg-white hover:text-green-500"
							onClick={() => nav('/register')}
						>
							Register
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
