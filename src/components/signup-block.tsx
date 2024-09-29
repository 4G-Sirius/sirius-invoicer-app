import BuildingBlock from "./building-block";
import { Button } from "./ui/button";
import TypographyH1 from "./ui/h1";
import TypographyP from "./ui/p";

const SignupBlock = () => {
	return (
		<BuildingBlock className="flex flex-col flex-1 justify-center items-center gap-6 max-h-96 h-full">
			<div className="flex flex-col justify-center items-center">
				<TypographyH1 className="text-2xl">Get Started</TypographyH1>
				<TypographyP className="max-w-64 text-center">
					Log In or Sign Up in the system <br /> to be able to view your invoice
					history
				</TypographyP>
			</div>
			<div className="flex gap-3">
				<Button variant="outline" className="w-full">
					Log In
				</Button>
				<Button className="w-full">Sign Up</Button>
			</div>
		</BuildingBlock>
	);
};

export default SignupBlock;
