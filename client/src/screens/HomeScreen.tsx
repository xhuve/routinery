import hero from '../assets/hero.jpg';
import section1 from '../assets/hero-section-1.jpg';
import section2 from '../assets/hero-section-2.jpg';
import section3 from '../assets/hero-section-3.jpg';

const HomeScreen = () => {
	return (
		<div className="space-y-12">
			<div
				className="w-full h-[500px] text-white bg-cover flex justify-end items-center "
				style={{ backgroundImage: `url(${hero})` }}
			>
				<div className="mr-12 text-right gap-8">
					<h1 className="text-5xl mb-2 font-bold shadow-black drop-shadow-lg">
						Welcome to Routinery
					</h1>
					<p className="text-xl mb-2 shadow-black drop-shadow-lg">
						Your personal guide to consistent workouts, tailored
						<br /> routines, and fitness success.
					</p>
					<button className="btn btn-lg btn-success hover:bg-green-600 text-white">
						Get Started
					</button>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row items-center mx-10 space-y-8  lg:space-y-0 lg:space-x-32">
				<img
					className="h-1/3 w-4/5 lg:w-2/5 lg:h-1/4 rounded-lg"
					src={section1}
					alt="Section 1"
				/>
				<div className="text-center px-8">
					Stay committed to your fitness goals with Routinery. Our personalized
					workout routines keep you on track, while progress tracking and
					reminders ensure you stay accountable every step of the way. No more
					skipped workouts, just consistent progress toward a healthier,
					stronger you.
				</div>
			</div>

			<div className="flex flex-col lg:flex-row-reverse items-center mx-10 space-y-8 lg:space-y-0 lg:space-x-32 lg:space-x-reverse">
				<img
					className="h-1/3 w-4/5 lg:w-2/5 rounded-lg"
					src={section2}
					alt="Section 2"
				/>
				<div className="text-center px-8">
					Track your progress based on workouts you have completed. Set goals,
					measure your improvement, and watch your fitness journey unfold. With
					Routinery, you'll never lose sight of your achievements, keeping you
					motivated to push even further.
				</div>
			</div>

			<div className="flex flex-col lg:flex-row items-center mx-10 space-y-8 lg:space-y-0 lg:space-x-32">
				<img
					className="h-1/3 w-4/5 lg:w-2/5 rounded-lg"
					src={section3}
					alt="Section 3"
				/>
				<div className="text-center px-8">
					Join a community of fitness enthusiasts who share your passion for
					healthy living. Get tips, stay inspired, and challenge yourself with
					new routines curated by experts or online users. Your fitness journey
					is better with others!
				</div>
			</div>

			<div className="w-full text-center p-8 bg-green-100 rounded-md">
				<h2 className="text-3xl mb-5">Ready to Take the First Step?</h2>
				<button className="btn btn-lg btn-success hover:bg-green-600 text-white">
					Register Now
				</button>
			</div>
		</div>
	);
};

export default HomeScreen;
