import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
	const nav = useNavigate();

	return (
		<>
			<div className="navbar flex items-center justify-between bg-green-500 h-16 w-full px-2">
				<img src={logo} className="h-12 w-16" />
				<div>
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
			</div>
		</>
	);
};

export default Navbar;
