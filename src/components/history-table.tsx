import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

type Props = {
	data: { id: string; contract: string; updatedAt: string }[];
};
const DataTable: FC<Props> = (props) => {
	const { data } = props;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice NO.</TableHead>
					<TableHead>Date uploaded</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => {
					return (
						<TableRow key={item.contract}>
							<TableCell>
								<Link href={`/invoice/${item.id}`}>
									<Button className="p-0" variant="link">
										{item.id}
									</Button>
								</Link>
							</TableCell>
							<TableCell>{item.updatedAt}</TableCell>
							<TableCell>PAID</TableCell>
							<TableCell className="text-right justify-end flex gap-2">
								<Button variant="ghost" size="icon">
									<Image src="./edit.svg" width={24} height={24} alt="edit" />
								</Button>
								<Button variant="ghost" size="icon">
									<Image
										src="./delete.svg"
										width={24}
										height={24}
										alt="delete"
									/>
								</Button>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default DataTable;
