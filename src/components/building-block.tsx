import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
};
const BuildingBlock: FC<PropsWithChildren<Props>> = (props) => {
	const { children, className } = props;

	return (
		<div
			className={`p-6 bg-foreground rounded-xl ${className} shadow-lg w-full `}
		>
			{children}
		</div>
	);
};

export default BuildingBlock;
