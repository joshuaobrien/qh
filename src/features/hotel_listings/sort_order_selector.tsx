import type { ChangeEvent } from "react";

type HotelListingsSorderOrderSelectorProps = {
	sortOrder: "high-first" | "low-first";
	setSortOrder: (value: "high-first" | "low-first") => void;
};

export const HotelListingsSorderOrderSelector = ({
	sortOrder,
	setSortOrder,
}: HotelListingsSorderOrderSelectorProps) => {
	const onChange = (e: ChangeEvent<HTMLSelectElement>) =>
		setSortOrder(e.target.value as "high-first" | "low-first");
	return (
		<div>
			<span>Sort by </span>
			<select value={sortOrder} onChange={onChange}>
				<option value="high-first">Price high-low</option>
				<option value="low-first">Price low-high</option>
			</select>
		</div>
	);
};
