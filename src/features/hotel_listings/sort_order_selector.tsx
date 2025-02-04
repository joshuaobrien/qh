import type { ChangeEvent } from "react";
import type { SortOrder } from "../../services/hotel_service/hotel_service";

type HotelListingsSortOrderSelectorProps = {
	sortOrder: SortOrder;
	setSortOrder: (value: SortOrder) => void;
};

// todo(josh): if we end up with more than two ways to sort,
// make everything surrounding sort order a bit more generic.
// for now though, manually listing things out is fine.
export const HotelListingsSortOrderSelector = ({
	sortOrder,
	setSortOrder,
}: HotelListingsSortOrderSelectorProps) => {
	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		if (isValidSortOrder(value)) {
			setSortOrder(value);
		} else {
			// todo(josh): wire this into our error service
			// there's going to be unexpected behaviour on the frontend now,
			// but at least we won't be sending invalid data to our backend.
			console.error("Invalid sort order");
		}
	};

	return (
		<div>
			<label htmlFor="sort-order">Sort by </label>
			<select id="sort-order" value={sortOrder} onChange={onChange}>
				<option value="high-first">Price high-low</option>
				<option value="low-first">Price low-high</option>
			</select>
		</div>
	);
};

const isValidSortOrder = (value: string): value is SortOrder => {
	return value === "high-first" || value === "low-first";
};
