"use client";
import Topbar from "@/components/topbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	useEffect(() => {
		const phone = localStorage.getItem("phone");

		if (!phone) {
			router.push("/login");
		}
	}, []);
	return (
		<div className="flex flex-col h-full gap-4 overflow-y-auto overflow-x-hidden">
			<Topbar />
			{children}
		</div>
	);
}
