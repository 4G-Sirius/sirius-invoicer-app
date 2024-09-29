"use client";
import { FC, useEffect, useState } from "react";
import { Input, InputProps } from "./ui/input";

type Props = InputProps & {
	label: string;
	setValue: any;
};

const FormInput: FC<Props> = (props) => {
	const [value, setValue] = useState(props.value);
	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	return (
		<div className="flex flex-col gap-2 flex-1">
			<span className="text-base font-medium text-gray-800">{props.label}</span>
			<Input {...props} onChange={props.onChange} value={value} />
		</div>
	);
};

export default FormInput;
