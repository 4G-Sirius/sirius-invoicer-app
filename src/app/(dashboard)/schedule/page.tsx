"use client";
import { Button } from "@/components/ui/button";
import TypographyH1 from "@/components/ui/h1";
import axios from "axios";
import { addMinutes, addMonths, format } from "date-fns";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { usePopper } from "react-popper";

const localizer = momentLocalizer(moment);

export default function ContractDetailsPage() {
	const [data, setData] = useState([]);
	const [date, setDate] = useState(new Date());
	const [selectedEvent, setSelectedEvent] = useState<any>(null);
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement);

	useEffect(() => {
		const fetchData = async () => {
			const phone = localStorage.getItem("phone");

			const response = await axios.get(
				`http://localhost:3001/contract/${phone}`
			);

			const transformedData = response.data.map((item: any) => {
				return {
					title: `Invoice #${item.id}`,
					start: new Date(item.updatedAt),
					id: item.id,
					company: item.beneficiary.name,
					total: item.payments.subtotal,
					end: addMinutes(new Date(item.updatedAt), 120),
				};
			});

			setData(transformedData);
		};

		fetchData();
	}, []);

	const handleEventClick = (event: any, e: any) => {
		setSelectedEvent(event);
		setReferenceElement(e.currentTarget);
	};

	const handleEventClose = () => {
		setSelectedEvent(null);
	};

	const handleNextMonth = () => {
		setDate(addMonths(date, 1));
	};
	const handlePrevMonth = () => {
		setDate(addMonths(date, -1));
	};
	const handleTodayClick = () => {
		setDate(new Date());
	};
	return (
		<div className="h-full px-20">
			<Link href="/">
				<Button
					variant="link"
					className="flex justify-start text-primary px-0 font-medium gap-1 py-4"
				>
					<Image src="/back.svg" width={24} height={24} alt="back" />
					<p>Back</p>
				</Button>
			</Link>
			<div className="h-full">
				<Calendar
					className="h-5/6 border-gray-300 border p-4 rounded-lg"
					events={data}
					localizer={localizer}
					startAccessor="start"
					endAccessor="end"
					date={date}
					views={["month", "week", "day"]}
					components={{
						toolbar: () => (
							<div className="p-3 flex justify-between items-center">
								<TypographyH1 className="flex-2">
									Invoices Schedule
								</TypographyH1>
								<div className="flex-3 font-medium text-lg text-gray-800">
									{format(date, "MMMM yyyy")}
								</div>
								<div className="flex gap-2 flex-2">
									<Button variant="outline" onClick={handlePrevMonth}>
										Prev
									</Button>
									<Button onClick={handleTodayClick}>Today</Button>
									<Button variant="outline" onClick={handleNextMonth}>
										Next
									</Button>
								</div>
							</div>
						),
					}}
					onSelectEvent={handleEventClick}
				/>
				{!!selectedEvent && (
					<div
						// @ts-ignore
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
						className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg flex flex-col gap-6 z-50"
					>
						<div className="flex justify-between">
							{
								// @ts-ignore
							}
							<TypographyH1>{selectedEvent.title}</TypographyH1>
							<Button onClick={handleEventClose} variant="ghost" size="icon">
								<Image
									src="/close.svg"
									width={16}
									height={16}
									alt="clos"
								></Image>
							</Button>
						</div>
						<div className="flex flex-col gap-2">
							<p>
								<span className="font-bold">Company Name </span>:
								{selectedEvent.company}
							</p>
							<p>
								<span className="font-bold">Issue date</span>:
								{moment(selectedEvent.start).format("DD/MM/YYYY")}
							</p>
							<p className="font-bold text-gray-800">
								Total:{selectedEvent.total}
							</p>
						</div>
						<div className="flex gap-2">
							<Button
								className="py-1 px-6"
								onClick={() => setSelectedEvent(null)}
								variant="outline"
							>
								Pay
							</Button>
							<Link href={`/invoice/${selectedEvent.id}`}>
								<Button className="p-1 px-6">View</Button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
