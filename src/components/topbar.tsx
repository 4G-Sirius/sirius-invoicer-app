import Image from "next/image";

const Topbar = () => {
	return (
		<div className="p-6 bg-foreground">
			<Image src="/logo.svg" width={178} height={36} alt="logo" />
		</div>
	);
};

export default Topbar;
