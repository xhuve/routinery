import HomePage from '../components/HomePage';
import LandingPage from '../components/LandingPage';
import { userStore } from '../zustand/zustand';

const HomeScreen = () => {
	const userInfo = userStore((state: any) => state.user);

	return userInfo ? <HomePage user={userInfo} /> : <LandingPage />;
};

export default HomeScreen;
