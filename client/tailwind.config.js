/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['montserrat-500', 'sans-seriff'],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				workoutThemeGreen: {
					primary: '#19D881', // Emerald Green - Main CTAs, important actions
					'primary-focus': '#059669', // Darker emerald for hover states
					'primary-content': '#ffffff', // White text on primary

					secondary: '#1E1E1E', // Indigo - Complementary actions
					'secondary-focus': '#4F46E5', // Darker indigo for hover states
					'secondary-content': '#ffffff', // White text on secondary

					accent: '#F59E0B', // Amber - Highlights, special features
					'accent-focus': '#D97706', // Darker amber for hover states
					'accent-content': '#ffffff', // White text on accent

					neutral: '#1F2937', // Cool Gray - Text, headers
					'neutral-focus': '#111827', // Darker gray for hover states
					'neutral-content': '#ffffff', // White text on neutral

					'base-100': '#ffffff', // White - Background
					'base-200': '#F3F4F6', // Light Cool Gray - Secondary background
					'base-300': '#E5E7EB', // Darker Cool Gray - Tertiary background
					'base-content': '#1F2937', // Dark text on base colors

					info: '#3B82F6', // Blue - Informational messages
					success: '#10B981', // Matching Green - Success messages
					warning: '#F59E0B', // Amber - Warning messages
					error: '#EF4444', // Red - Error messages

					// Additional custom colors for workout-specific features
					'--intensity-low': '#34D399', // Low intensity workouts
					'--intensity-medium': '#10B981', // Medium intensity
					'--intensity-high': '#059669', // High intensity

					'--pulse-green': '#34D399', // Heart rate normal
					'--pulse-amber': '#F59E0B', // Heart rate elevated
					'--pulse-red': '#EF4444', // Heart rate high

					'--progress-track': '#D1FAE5', // Progress bar background
					'--progress-fill': '#10B981', // Progress bar fill

					'--workout-card': '#F9FAFB', // Workout card background
					'--workout-card-hover': '#F3F4F6', // Workout card hover state

					// Stats and metrics colors
					'--calories': '#F59E0B', // Calories burned
					'--distance': '#6366F1', // Distance covered
					'--time': '#10B981', // Time/Duration
				},
			},
		],
	},
};
