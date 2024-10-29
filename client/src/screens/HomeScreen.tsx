import HomePage from '../components/HomePage';
import LandingPage from '../components/LandingPage';
import { useStore } from '../zustand/zustand';

const HomeScreen = () => {
	const userInfo = useStore((state: any) => state.user);
	console.log('🚀 ~ HomeScreen ~ userInfo:', userInfo);

	return userInfo ? <HomePage /> : <LandingPage />;
};

export default HomeScreen;
