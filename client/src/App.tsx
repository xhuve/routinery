import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userStore } from './zustand/zustand';

function App() {
	const setUser = userStore((state) => state.setUser);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get('/api/auth/me')
			.then((res) => {
				setUser(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return null;

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
