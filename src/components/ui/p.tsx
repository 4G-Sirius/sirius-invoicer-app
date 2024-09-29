import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
};
const TypographyP: FC<PropsWithChildren<Props>> = (props) => {
	const { children, className } = props;

	return (
		<h1
			className={`scroll-m-20 text-base text-gray-600 tracking-tight ${className}`}
		>
			{children}
		</h1>
	);
};

export default TypographyP;
