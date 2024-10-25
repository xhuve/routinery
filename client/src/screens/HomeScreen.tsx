import LandingPage from '../components/LandingPage';
import { useStore } from '../zustand/zustand';

const HomeScreen = () => {
	const userInfo = useStore((state: any) => state.user);

	return userInfo ? <LandingPage /> : <div>Home page</div>;
};

export default HomeScreen;
