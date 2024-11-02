import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import App from './App.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import ExerciseScreen from './screens/ExerciseScreen.tsx';
import WorkoutScreen from './screens/WorkoutScreen.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="/" element={<PrivateRoute />}>
				<Route path="/exercises" element={<ExerciseScreen />} />
				<Route path="/workouts" element={<WorkoutScreen />} />
			</Route>
		</Route>,
	),
);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
