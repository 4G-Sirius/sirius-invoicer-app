import { FC } from "react";

type Props = {
	items: string[];
};
const List: FC<Props> = ({ items }) => {
	return (
		<ul className="bg-blue-100 border-l-4 border-primary rounded-lg px-4 py-2">
			{items.map((item) => {
				return <li key={item}>{item}</li>;
			})}
		</ul>
	);
};

export default List;
