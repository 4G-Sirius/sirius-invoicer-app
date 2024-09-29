"use client";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import { Contact, ServiceAndGoods } from "../../types";
import InvocieTable from "./invoice-table";
import InvoiceField from "./invoice/invoice-field";
import TypographyH1 from "./ui/h1";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

type Props = {
	page: number;
	onNextPage: () => void;
	onPrevPage: () => void;
	invoice: {
		issueDate: string;
		dueDate: string | null;
		fromCompany: string;
		address: string;
		servicesAndGoods: ServiceAndGoods[];
		city: string;
		iban: string;
		subtotal: number;
		tva: number;
		toIdno: string;
		total: number;
		swift: string;
		toCompany: string;
		contacts: Contact[];
		idno: string;
		id: string;
	};
};
const PdfPreview: FC<Props> = (props) => {
	const { invoice, page, onNextPage, onPrevPage } = props;
	const {
		issueDate,
		dueDate,
		fromCompany,
		address,
		iban,
		subtotal,
		tva,
		servicesAndGoods,
		contacts,
		toIdno,
		total,
		swift,
		toCompany,
		idno,
		id,
	} = invoice;
	return (
		<div className="overflow-hidden h-full px-8 py-4 flex flex-col gap-2">
			<div className="flex">
				<div className="text-gray-500">{contacts.length} Invoices</div>
				<Pagination className="flex-1">
					<PaginationContent>
						<PaginationItem onClick={onPrevPage}>
							<PaginationPrevious href="#" />
						</PaginationItem>
						{contacts.map((contact, index) => {
							return (
								<PaginationItem>
									<PaginationLink isActive={page === index + 1} href="#">
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							);
						})}

						<PaginationItem onClick={onNextPage}>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
				<div></div>
			</div>
			<div
				id="element-to-print"
				className="border-gray-300 border bg-gray-50 flex flex-col gap-4 rounded-xl overflow-y-auto h-[1050px] overflow-x-hidden"
			>
				<div className="py-4 p-4  border-b border-gray-300 bg-foreground">
					<Image src="/logo.svg" width={120} height={24} alt="logo" />
				</div>
				<div className="flex  p-4  gap-11 flex-col h-full pb-0">
					<TypographyH1>INVOICE ID {id}</TypographyH1>
					<div className="flex gap-11">
						<div className="flex flex-col w-full gap-2">
							<InvoiceField
								label="Issue Date"
								value={format(
									dueDate !== "null" ? dueDate || new Date() : new Date(),
									"dd/mm/yyyy"
								)}
							/>
							<InvoiceField
								label="Due Date"
								value={format(
									dueDate !== "null" ? dueDate || new Date() : new Date(),
									"dd/mm/yyyy"
								)}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InvoiceField label="From" value={fromCompany} />
							<InvoiceField label="To" value={toCompany} />
							<InvoiceField label="IDNO" value={toIdno} />
						</div>
					</div>
					<InvocieTable data={servicesAndGoods} />

					<div className="flex justify-between gap-8 pb-8">
						<div className="w-full flex flex-col gap-2">
							<InvoiceField label="Name" value={fromCompany} />
							<InvoiceField label="IBAN" value={iban} />
							<InvoiceField label="IDNO" value={idno} />
							<InvoiceField label="SWIFT/BIC" value={swift} />
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InvoiceField label="Subtotal" value={subtotal} />
							<InvoiceField label="TVA" value={tva} />
							<InvoiceField label="Total" value={total} />
							{/* <InvoiceField label="Advanced Paid" value="10% (MDL 10 000)" />
							<InvoiceField label="Balance Due" value="10% (MDL 10 000)" /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PdfPreview;
