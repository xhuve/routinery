import { create } from 'zustand';

interface userDetails {
	_id: string;
	username: string;
	email: string;
	password: string;
	gender: string;
	profilePicture: string;
}

interface StoreState {
	user: userDetails | null;
	setUser: (userDetails: userDetails) => void;
	removeUser: () => void;
}

export const userStore = create<StoreState>()((set) => ({
	user: null,
	setUser: (userDetails: userDetails) => set({ user: userDetails }),
	removeUser: () => set({ user: null }),
}));

interface ExerciseStoreState {
	exercises: string[] | null;
	setExercises: (exerciseDetails: string) => void;
	removeExercises: () => void;
}

export const exerciseStore = create<ExerciseStoreState>()((set) => ({
	exercises: null,
	setExercises: (exerciseIds: string) =>
		set((state) => ({
			exercises: state.exercises
				? [...state.exercises, ...exerciseIds]
				: [...exerciseIds],
		})),
	removeExercises: () => set({ exercises: null }),
}));
