import { FC } from "react";

type Props = {
	label: string;
	value: string | number | null;
};

const InvoiceField: FC<Props> = ({ label, value }) => {
	return (
		<div className="flex gap-3">
			<span className="font-bold text-base text-gray-900 whitespace-nowrap">
				{label}:
			</span>
			<span className="font-medium text-base text-gray-900 whitespace-nowrap">
				{value}
			</span>
		</div>
	);
};

export default InvoiceField;
