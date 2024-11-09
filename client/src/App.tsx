import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { userStore } from './zustand/zustand';
import Loader from './components/Loader';

function App() {
	const authenticatedUser = userStore((state) => state.authenticatedUser);
	const isLoading = userStore((state) => state.isLoading);

	useEffect(() => {
		authenticatedUser();
	}, [authenticatedUser]);

	if (isLoading) return <Loader />;

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
