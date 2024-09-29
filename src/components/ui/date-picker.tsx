"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { InputProps } from "react-day-picker";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type Props = InputProps & {
	value?: Date | null;
	name?: string;
	setValue: UseFormSetValue<FieldValues>;
};
export function DatePicker(props: Props) {
	const [state, setState] = useState<Date | null | undefined>(null);
	const { setValue, name } = props;
	const handleChange = (date?: Date) => {
		setValue(name || "", date);
		setState(date);
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-between text-left py-3 px-4 font-normal border-gray-200",
						!state && "text-muted-foreground"
					)}
				>
					{state ? format(state, "dd/mm/yyyy") : <span>DD/MM/YYYY</span>}
					<CalendarIcon className="mr-2 h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					// @ts-ignore
					selected={state !== "null" ? state || new Date() : new Date()}
					onSelect={(e) => handleChange(e)}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
