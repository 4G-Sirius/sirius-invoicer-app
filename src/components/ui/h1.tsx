import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
};
const TypographyH1: FC<PropsWithChildren<Props>> = (props) => {
	const { children, className } = props;
	return (
		<h1
			className={`scroll-m-20 text-xl font-extrabold tracking-tight ${className}`}
		>
			{children}
		</h1>
	);
};

export default TypographyH1;
