import { useStore } from '../zustand/zustand';

const HomePage = () => {
	const user = useStore((state) => state.user);

	return (
		<>
			<div className="flex justify-center pt-[2rem] text-8xl font-montserrat">
				Welcome {user?.username}
			</div>
			<div className="flex justify-center items-center h-screen">
				<div className="flex gap-4">
					<div className="btn py-[10rem] px-[10rem] bg-green-500 hover:bg-green-700 rounded-xl border-2">
						<p className="text-center text-2xl text-white">Workout</p>
					</div>
					<div className="btn py-[10rem] px-[10rem] bg-green-500 hover:bg-green-700 rounded-xl border-2">
						<p className="text-center text-2xl text-white">Exercises</p>
					</div>
					<div className="btn py-[10rem] px-[10rem] bg-green-500 hover:bg-green-700 rounded-xl border-2">
						<p className="text-center text-2xl text-white">Test</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
