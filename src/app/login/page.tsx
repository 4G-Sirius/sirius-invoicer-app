"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
	const [phone, setPhone] = useState("");
	const router = useRouter();
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};
	const handleLogin = async () => {
		localStorage.setItem("phone", phone);
		await axios.post("${process.env.NEXT_PUBLIC_API_URL}/user", { phone });
		router.push("/");
	};

	useEffect(() => {
		const phone = localStorage.getItem("phone");
		if (phone) {
			router.push("/");
		}
	}, []);
	return (
		<div className="flex justify-center w-full flex-col gap-4 gap-y-12 items-center h-full px-12 ">
			<div className="bg-foreground rounded-2xl shadow-lg px-6 py-14 flex flex-col items-center gap-28 justify-between">
				<Image src="/logo.svg" width={241} height={48} alt="logo" />
				<div className="flex flex-col gap-6 items-center">
					<div className="flex flex-col gap-2 justify-center items-center">
						<h1 className="text-2xl font-bold text-gray-800">Get Started</h1>
						<p className="text-base text-gray-600">
							Log In in the system using mobile number
						</p>
					</div>
					<Input
						placeholder="XXX XXX XXX"
						className="min-w-96"
						onChange={handleInputChange}
					/>
					<Button className="max-w-max px-20" onClick={handleLogin}>
						Log In
					</Button>
				</div>
			</div>
		</div>
	);
}
