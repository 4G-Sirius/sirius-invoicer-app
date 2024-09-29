"use client";
import { FC } from "react";
import { ServiceAndGoods } from "../../types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

type Props = {
	data: ServiceAndGoods[];
};
const InvocieTable: FC<Props> = (props) => {
	const { data } = props;
	console.log(data);
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Goods and Services</TableHead>
					<TableHead>Quantity</TableHead>
					<TableHead>U/M</TableHead>
					<TableHead>Price/unit</TableHead>
					<TableHead>TVA</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, index) => {
					return (
						<TableRow key={index}>
							<TableCell className="font-medium">{item.name}</TableCell>
							<TableCell>{item.quantity}</TableCell>
							<TableCell>{item.um}</TableCell>
							<TableCell>{item.price}</TableCell>
							<TableCell>{item.tva}%</TableCell>
							<TableCell>{item.quantity * item.price}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default InvocieTable;
