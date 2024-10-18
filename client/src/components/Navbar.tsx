import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const nav = useNavigate();

	return (
		<>
			<div className="navbar-end flex items-center bg-green-500 h-16 w-full px-2">
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
				<button className="btn btn-ghost text-base text-white hover:bg-white hover:text-green-500">
					Exercises
				</button>
				<button className="btn btn-ghost text-base text-white hover:bg-white hover:text-green-500">
					Exercises
				</button>
				<button className="btn btn-ghost text-base text-white hover:bg-white hover:text-green-500">
					Exercises
				</button>
			</div>
		</>
	);
};

export default Navbar;
