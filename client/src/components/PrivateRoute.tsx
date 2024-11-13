import { useEffect } from 'react';
import { userStore } from '../zustand/zustand';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const { user, isLoading, authenticateUser } = userStore();

	useEffect(() => {
		if (!user && !isLoading) {
			authenticateUser();
		}
	}, []);

	return user ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
