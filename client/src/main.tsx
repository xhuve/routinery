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
import { CreateWorkoutScreen } from './screens/CreateWorkoutScreen.tsx';
import WorkoutLibraryScreen from './screens/WorkoutLibraryScreen.tsx';
import EditWorkoutScreen from './screens/EditWorkoutScreen.tsx';
import StartWorkoutScreen from './screens/StartWorkoutScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="/" element={<PrivateRoute />}>
				<Route path="/create-workout" element={<CreateWorkoutScreen />} />
				<Route path="/exercises" element={<ExerciseScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
				<Route path="/workouts" element={<WorkoutScreen />} />
				<Route path="/workout-library" element={<WorkoutLibraryScreen />} />
				<Route
					path="/edit-workout/:workoutId"
					element={<EditWorkoutScreen />}
				/>
				<Route
					path="/start-workout/:workoutId"
					element={<StartWorkoutScreen />}
				/>
			</Route>
		</Route>,
	),
);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
