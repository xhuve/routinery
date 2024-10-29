import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useStore } from '../zustand/zustand';

const Navbar = () => {
	const nav = useNavigate();
	const user = useStore((state) => state.user);

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
						<ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
							<li>
								<Link to={'/profile'}>Profile</Link>
							</li>
							<li>
								<Link to={''}>Logout</Link>
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
	console.log('🚀 ~ Navbar ~ user:', user);
};

export default Navbar;
