"use client";
import HistoryBlock from "@/components/history-block";
import UploadFileBlock from "@/components/upload-file-block";

export default function Home() {
	return (
		<div className="flex flex-col gap-4 gap-y-8 items-center h-full px-12 ">
			<div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-4 items-center h-full w-full">
				<UploadFileBlock />
				<HistoryBlock />
			</div>
			{/* <Link href="/schedule" className="w-full">
				<BuildingBlock className="p-6 flex gap-4 items-center">
					<Image src="/schedule.svg" width={32} height={32} alt="schedule" />
					<TypographyH1 className="flex-1">Invoices Schedule</TypographyH1>
					<Button className="p-0" variant="link">
						View
					</Button>
				</BuildingBlock>
			</Link>
			<div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
				<BarChartComponent />
				<LineChartComponent />
				<AreaChartComponent />
			</div> */}
		</div>
	);
}
