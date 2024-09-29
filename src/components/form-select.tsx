import { FC, useEffect, useState } from "react";
import { InputProps } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type Props = InputProps & {
	label: string;
	setValue: any;
	value: any;
	options: { label: string; value: string | number }[];
};
const FormSelect: FC<Props> = ({
	label,
	options,
	name,
	placeholder,
	setValue,
	value,
}) => {
	const [selected, setSelected] = useState("");

	useEffect(() => {
		setSelected(value);
	}, [value]);
	return (
		<div className="flex flex-col gap-2 flex-1">
			<span className="text-base font-medium text-gray-800">{label}</span>
			<Select
				value={selected}
				onValueChange={(value) => {
					console.log(name, value);
					setValue(name, value, { shouldValidate: true });
					setSelected(value);
				}}
			>
				<SelectTrigger className="w-[180px] h-[46px] bg-foreground">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((item) => {
						return (
							<SelectItem value={item.value as any}>{item.label}</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};

export default FormSelect;
