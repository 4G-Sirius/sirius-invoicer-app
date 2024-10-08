"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BuildingBlock from "./building-block";
import DataTable from "./history-table";
import TypographyH1 from "./ui/h1";
import TypographyP from "./ui/p";

const HistoryBlock = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const phone = localStorage.getItem("phone");

			const data = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/contract/${phone}`
			);

			setData(data.data);
		};

		fetchData();
	}, []);

	return (
		<BuildingBlock className="flex flex-col flex-1 h-full pb-2 max-h-[500px]">
			<TypographyH1 className="text-2xl mb-6">Invoice History</TypographyH1>
			{!!data?.length ? (
				<DataTable data={data} />
			) : (
				<div className="flex justify-center flex-1 items-center">
					<TypographyP className="text-2xl">No data available</TypographyP>
				</div>
			)}
		</BuildingBlock>
	);
};

export default HistoryBlock;
