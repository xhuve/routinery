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

export const useStore = create<StoreState>()((set) => ({
	user: null,
	setUser: (userDetails: userDetails) => set({ user: userDetails }),
	removeUser: () => set({ user: null }),
}));
