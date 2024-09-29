"use client";
import byteSize from "byte-size";
import Image from "next/image";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import TypographyP from "./p";
type Props = {
	file: File | null;
	onDrop: (acceptedFiles: File[]) => void;
};
const Dropzone: FC<Props> = (props) => {
	const { file, onDrop } = props;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return file ? (
		<div className="border flex  gap-2 border-gray-400 p-4 rounded-lg items-center">
			<Image src="./file.svg" width={24} height={24} alt="file" />
			<div className="flex flex-1 flex-col">
				<TypographyP className="text-gray-800">{file.name}</TypographyP>
				<TypographyP className="text-gray-500">
					{byteSize(file.size).toString()}
				</TypographyP>
			</div>
			<Button variant="ghost" size="icon">
				<Image src="./close.svg" width={24} height={24} alt="file" />
			</Button>
		</div>
	) : (
		<div
			{...getRootProps()}
			className="flex justify-center items-center border-2 boder-gray-400 border-dashed rounded-sm h-[144px] p-6 flex-1"
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<div className="flex gap-2">
					<Image src="./upload.svg" width={40} height={40} alt="upload" />
					<div className="flex flex-col">
						<TypographyP>Drag & Drop file here</TypographyP>
						<TypographyP>Max file size: 100 MB</TypographyP>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropzone;
