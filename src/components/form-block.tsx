import { FC, PropsWithChildren } from "react";
import TypographyH1 from "./ui/h1";

type Props = {
	title: string;
	leftTitle?: string;
};
const FormBlock: FC<PropsWithChildren<Props>> = (props) => {
	const { title, children, leftTitle } = props;
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<TypographyH1>{title}</TypographyH1>
				{leftTitle && <TypographyH1>{leftTitle}</TypographyH1>}
			</div>
			{children}
		</div>
	);
};

export default FormBlock;
