"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BuildingBlock from "./building-block";
import DataTable from "./history-table";
import TypographyH1 from "./ui/h1";
import TypographyP from "./ui/p";

const HistoryBlock = () => {
	const phone = localStorage.getItem("phone");
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get(`http://localhost:3001/contract/${phone}`);

			setData(data.data);
		};

		fetchData();
	}, []);

	return (
		<BuildingBlock className="flex flex-col flex-1 h-full pb-2">
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
