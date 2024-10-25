import { create } from 'zustand';

interface userDetails {
	username: string;
	email: string;
	password: string;
	gender: string;
}

interface StoreState {
	user: userDetails | {};
	setUser: (userDetails: userDetails) => void;
	removeUser: () => void;
}

export const useStore = create<StoreState>((set) => ({
	user: {},
	setUser: (userDetails: userDetails) => set({ user: userDetails }),
	removeUser: () => set({ user: {} }),
}));
