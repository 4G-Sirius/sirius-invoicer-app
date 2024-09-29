import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#F8FAFC",
				foreground: "#FFFFFF",
				primary: "#4B7DF3",
				"blue-100": "#EDF2FE",
				"gray-400": "#97A3B6",
				"gray-500": "#677489",
				"gray-600": "#4A5567",
				"gray-800": "#20293A",
			},
			height: {
				content: "calc(100% - 56px)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
