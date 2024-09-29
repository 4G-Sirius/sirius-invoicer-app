"use client";

import { FC } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { DatePicker } from "./ui/date-picker";
import { InputProps } from "./ui/input";

type Props = InputProps & {
	label: string;
	value?: Date;
	setValue: UseFormSetValue<FieldValues>;
};

const FormDatePicker: FC<Props> = (props) => {
	return (
		<div className="flex flex-col gap-2 flex-1">
			<span className="text-base font-medium text-gray-800">{props.label}</span>
			<DatePicker {...props} value={props.value as unknown as any} />
		</div>
	);
};

export default FormDatePicker;
