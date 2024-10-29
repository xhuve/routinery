import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import { useStore } from './zustand/zustand';

function App() {
	const setUser = useStore((state) => state.setUser);

	useEffect(() => {
		axios
			.get('api/auth/me')
			.then((res) => {
				console.log(res);
				setUser(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<main className="flex flex-col h-screen">
				<Navbar />
				<Outlet />
			</main>
			<Toaster />
		</>
	);
}

export default App;
