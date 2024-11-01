import { userStore } from '../zustand/zustand';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const userInfo = userStore((state) => state.user);

	return userInfo ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
