import { Body } from "../../design_system/typography";

type HotelListingsSummaryProps = {
	count: number;
	location: string;
};

export const HotelListingsSummary = ({
	count,
	location,
}: HotelListingsSummaryProps) => (
	<Body>
		Showing <Body isBold>{count}</Body>{" "}
		<Body isItalics>{count === 1 ? "hotel" : "hotels"} in</Body>{" "}
		<Body isBold>{location}</Body>
	</Body>
);
