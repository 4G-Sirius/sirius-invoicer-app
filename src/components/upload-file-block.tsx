"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import BuildingBlock from "./building-block";
import { Button } from "./ui/button";
import Dropzone from "./ui/dropdown";
import TypographyH1 from "./ui/h1";
import List from "./ui/list";

const UploadFileBlock: FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleDrop = (acceptedFiles: File[]) => {
		setFile(acceptedFiles[0]);
	};
	const router = useRouter();

	const handleConvert = async () => {
		const phone = localStorage.getItem("phone");
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append("images", file as File);
			const invoice = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/contract/pdf/${phone}`,
				formData
			);

			router.push(`/invoice/${invoice.data.id}`);
			toast.success("File converted successfully");
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<BuildingBlock className="flex flex-col flex-1 gap-4 h-full max-h-[500px]">
			<TypographyH1>Upload a file to convert it into an invoice</TypographyH1>
			<List
				items={[
					"Only one file can be uploaded at a time",
					"Supported file format: .pdf",
				]}
			/>
			<div className="h-[150px]">
				<Dropzone onDrop={handleDrop} file={file} />
			</div>
			<div className="flex flex-col items-center w-full">
				<Button variant="link">or select folder</Button>
				<Button
					onClick={handleConvert}
					disabled={isLoading || !file}
					className="max-w-max"
				>
					{isLoading ? "Converting..." : "Convert to Invoice"}
				</Button>
			</div>
		</BuildingBlock>
	);
};

export default UploadFileBlock;
