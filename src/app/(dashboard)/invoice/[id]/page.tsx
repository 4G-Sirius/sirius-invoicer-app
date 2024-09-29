"use client";
// @ts-expect-error
import html2pdf from "html2pdf.js";

import BuildingBlock from "@/components/building-block";
import FormBlock from "@/components/form-block";
import FormDatePicker from "@/components/form-datepicker";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import PdfPreview from "@/components/pdf-preview";
import { Button } from "@/components/ui/button";
import List from "@/components/ui/list";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Contact,
	InvoiceResponse,
	ServiceAndGoods,
	Subtotal,
} from "../../../../../types";

export default function ContractDetailsPage() {
	const [page, setPage] = useState(1);
	const {
		register,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<{
		id: string;
		idno: string;
		iban: string;
		paymentType: string;
		currency: string;
		swift: string;
		issueDate: string;
		dueDate: string | null;
		from: string;
		servicesAndGoods: ServiceAndGoods[];
		contacts: Contact[];
		subtotals: Subtotal[];
	}>({
		mode: "onChange",
		defaultValues: {
			contacts: [{ idno: "", to: "" }],
			currency: "MDL",
			dueDate: null,
			iban: "",
			from: "",
			id: "",
			idno: "",
			issueDate: "",
			paymentType: "",
			servicesAndGoods: [{ name: "", quantity: 0, um: "", tva: 0, price: 0 }],
			subtotals: [{ tva: 0, discount: 0 }],
			swift: "",
		},
	});

	const values = watch();
	const handleDownloadPdf = () => {
		const element = document.getElementById("element-to-print");
		const opt = {
			filename: "myfile.pdf",
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		const somt = html2pdf().set(opt).from(element).save();
	};

	const handleAddItem = () => {
		setValue("servicesAndGoods", [
			...values.servicesAndGoods,
			{
				name: "",
				quantity: 0,
				um: "sets",
				tva: 0,
				price: 0,
			},
		]);
	};

	const handleAddContact = () => {
		setValue("contacts", [
			...values.contacts,
			{
				to: "",
				idno: "",
			},
		]);
	};

	const handleAddSubtotal = () => {
		setValue("subtotals", [
			...values.subtotals,
			{
				tva: 0,
				discount: 0,
			},
		]);
	};
	const phone = localStorage.getItem("phone");
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const data = await axios.get<InvoiceResponse>(
				`${process.env.NEXT_PUBLIC_API_URL}/contract/${phone}/${id}`
			);
			const { payments, provider, beneficiary } = data.data;

			setValue("id", data.data.id.toString(), { shouldValidate: true });
			setValue("currency", payments.currency || "", { shouldValidate: true });
			setValue("iban", provider.iban, { shouldValidate: true });
			setValue("id", data.data.id.toString(), { shouldValidate: true });
			setValue("idno", provider.idno, { shouldValidate: true });
			setValue("issueDate", data.data.dates.issueDate || "", {
				shouldValidate: true,
			});
			setValue("dueDate", data.data.dates.dueDate, { shouldValidate: true });
			setValue("swift", data.data.provider.bic, { shouldValidate: true });
			setValue("from", provider.name, { shouldValidate: true });
			setValue("contacts.0.to", beneficiary.name, { shouldValidate: true });
			setValue("contacts.0.idno", beneficiary.idno, { shouldValidate: true });

			const service = {
				name: "",
				quantity: 0,
				um: "sets",
				tva: 0,
				price: 0,
			};
			setValue(
				"servicesAndGoods",
				data.data.service.name ? [data.data.service] : [service]
			);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	console.log(values);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	const total = values.servicesAndGoods.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);

	return (
		<div className="flex flex-col h-full px-16 pb-8 overflow-hidden">
			<Link href="/">
				<Button
					variant="link"
					className="flex justify-start text-primary px-0 font-medium gap-1 py-4"
				>
					<Image src="/back.svg" width={24} height={24} alt="back" />
					<p>Back</p>
				</Button>
			</Link>
			<div className="flex flex-col lg:flex-row gap-6 h-content">
				<BuildingBlock className="relative flex gap-6 max-h-full">
					<div className="h-full overflow-y-auto w-full overflow-x-hidden flex flex-col gap-6 pb-32">
						<FormBlock title="Invoice Details">
							<div className="flex gap-3">
								<div
									onClick={() => setValue("paymentType", "one-time")}
									className={`rounded-xl py-2 px-4 cursor-pointer ${
										values.paymentType === "one-time"
											? "border-primary border-2 "
											: "border-2 border-gray-100"
									}`}
								>
									One Time
								</div>
								<div
									onClick={() => setValue("paymentType", "recurring")}
									className={`rounded-xl py-2 px-4 cursor-pointer ${
										values.paymentType === "recurring"
											? "border-primary border-2 "
											: "border-2 border-gray-100"
									}`}
								>
									Recurring
								</div>
							</div>
							<FormInput
								setValue={setValue}
								label="Invoice ID"
								value={values.id}
								{...register("id", { required: true })}
								disabled
							/>
							<div className="flex gap-4">
								<FormDatePicker
									label="Issue Date"
									setValue={setValue}
									// @ts-expect-error
									value={values.issueDate}
									placeholder="DD/MM/YYYY"
									{...register("issueDate", { required: true })}
								/>
								<FormDatePicker
									label="Due Date"
									setValue={setValue}
									// @ts-expect-error
									value={values.dueDate as unknown as Date}
									placeholder="DD/MM/YYYY"
									{...register("dueDate", { required: true })}
								/>
							</div>
						</FormBlock>
						<FormBlock title="Bill Payment">
							<FormInput
								setValue={setValue}
								label="From"
								placeholder="John Doe"
								{...register("from", { required: true })}
							/>
							{values.contacts.map((contact, index) => {
								return (
									<div key={index} className="flex gap-4">
										<FormInput
											setValue={setValue}
											label="To"
											placeholder="Max Shmidth"
											{...register(`contacts.${index}.to`, {
												required: true,
											})}
											value={contact.to}
										/>
										<FormInput
											setValue={setValue}
											label="IDNO"
											{...register(`contacts.${index}.idno`, {
												required: true,
											})}
											placeholder="XXXX XXXX XXXXX"
											value={contact.idno}
										/>
									</div>
								);
							})}
							<Button
								onClick={handleAddContact}
								variant="link"
								className="flex justify-start px-0"
							>
								<Image src="/plus.svg" width={24} height={24} alt="plus" />
								Add Contact
							</Button>
						</FormBlock>
						<FormBlock title="Goods and Services">
							<List items={["All prices are in MDL"]} />
							{values.servicesAndGoods.map((service, index) => {
								return (
									<div
										className="bg-gray-50 flex flex-col gap-2 rounded-lg p-2"
										key={index}
									>
										<FormInput
											setValue={setValue}
											label="Item Name"
											value={service.name}
											{...register(`servicesAndGoods.${index}.name`, {
												required: true,
											})}
											placeholder="Pliumbing Services"
										/>
										<div className="flex gap-2">
											<FormInput
												setValue={setValue}
												label="Quantity"
												{...register(`servicesAndGoods.${index}.quantity`, {
													required: true,
												})}
												value={service.quantity}
												placeholder="XX"
											/>
											<FormSelect
												setValue={setValue}
												label="U/M"
												{...register(`servicesAndGoods.${index}.um`, {
													required: true,
												})}
												options={[
													{ label: "Sets", value: "sets" },
													{ label: "Pcs", value: "pcs" },
												]}
												value={service.um}
												placeholder="Select UM"
											/>
											<FormSelect
												setValue={setValue}
												{...register(`servicesAndGoods.${index}.tva`, {
													required: true,
												})}
												options={[
													{ label: "0%", value: 0 },
													{ label: "8%", value: 8 },
													{ label: "12%", value: 12 },
													{ label: "20%", value: 20 },
												]}
												label="TVA"
												value={service.tva}
												placeholder="Select TVA"
											/>
											<FormInput
												setValue={setValue}
												{...register(`servicesAndGoods.${index}.price`, {
													required: true,
												})}
												value={service.price}
												label="Price/unit"
												placeholder="XXX"
											/>
										</div>
									</div>
								);
							})}
							<Button
								onClick={handleAddItem}
								variant="link"
								className="flex justify-start px-0"
							>
								<Image src="/plus.svg" width={24} height={24} alt="plus" />
								Add Item
							</Button>
						</FormBlock>
						<FormBlock title="Total" leftTitle={`MDL ${total}`}>
							{/* {values.subtotals.map((item, index) => {
								return (
									<div key={index} className="flex gap-4">
										<FormInput
											setValue={setValue}
											label="TVA"
											value={item.tva}
											{...register(`subtotals.${index}.tva`, {
												required: true,
											})}
											placeholder="Enter Value Added Tax"
										/>
										<FormInput
											setValue={setValue}
											label="Discount (%)"
											{...register(`subtotals.${index}.discount`, {
												required: true,
											})}
											value={item.discount}
											className="Enter a discount"
										/>
									</div>
								);
							})} */}
							{/* <Button
								onClick={handleAddSubtotal}
								variant="link"
								className="flex justify-start px-0"
							>
								<Image src="/plus.svg" width={24} height={24} alt="plus" />
								Add Advanced Payment
							</Button>
							<div className="flex justify-between">
								<TypographyH1>Total</TypographyH1>
								<TypographyH1>MDL 4400</TypographyH1>
							</div> */}
						</FormBlock>

						{/* <FormBlock title="Milestones"></FormBlock> */}
						<FormBlock title="Bank Details">
							<div className="flex gap-4">
								<FormInput
									setValue={setValue}
									label="IDNO"
									value={values.idno}
									placeholder="XXXX XXXX XXXXX"
									{...register("idno", { required: true })}
								/>
								<FormInput
									setValue={setValue}
									label="IBAN"
									value={values.iban}
									placeholder="MD5ARXXXXXXXXXXXX"
									{...register("iban", { required: true })}
								/>
							</div>
							<div className="flex gap-4">
								<FormInput
									setValue={setValue}
									label="Currency"
									value={values.currency}
									placeholder="MDL"
									{...register("currency", { required: true })}
								/>
								<FormInput
									setValue={setValue}
									label="SWIFT/BIC"
									value={values.swift}
									placeholder="AGRNMD2X"
									{...register("swift", { required: true })}
								/>
							</div>
						</FormBlock>
						<div className="absolute bottom-0 bg-foreground border-t rounded-b-xl border-gray-100 w-full -ml-6 flex gap-3 py-3 pb-6 px-6">
							<Button
								onClick={handleDownloadPdf}
								className="flex-1 py-3"
								variant="outline"
							>
								Download as PDF
							</Button>
							<Button onClick={handleDownloadPdf} className="flex-1 py-3">
								Save
							</Button>
						</div>
					</div>
				</BuildingBlock>
				<BuildingBlock className="max-h-full">
					<PdfPreview
						page={page}
						onNextPage={() =>
							setPage((prev) =>
								prev + 1 <= values.contacts.length ? prev + 1 : prev
							)
						}
						onPrevPage={() => setPage((prev) => (prev - 1 < 1 ? 1 : prev - 1))}
						invoice={{
							address: "",
							city: "",
							dueDate: values.dueDate,
							iban: values.iban,
							id: values.id,
							contacts: values.contacts,
							servicesAndGoods: values.servicesAndGoods,
							idno: values.idno,
							issueDate: values.issueDate,
							fromCompany: values.from,
							subtotal: total,
							swift: values.swift,
							toCompany: values.contacts[page - 1]?.to,
							toIdno: values.contacts[page - 1]?.idno,
							total: total,
							tva: 0,
						}}
					/>
				</BuildingBlock>
			</div>
		</div>
	);
}
