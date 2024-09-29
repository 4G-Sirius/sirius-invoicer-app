"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	setValue?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex w-full bg-transparent bg-foreground px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 border-[#E3E8EF] border rounded-xl",
					className
				)}
				value={props.value}
				ref={ref}
				{...props}
				onChange={(e) => {
					if (props?.setValue) {
						props?.setValue?.(props.name, e.target.value, {
							shouldValidate: true,
						});
					}
					props.onChange && props.onChange(e);
				}}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
