import type React from "react";
import logo from "../../design_system/logo.png";
import { Body } from "../../design_system/typography";
import type { HotelService } from "../../services/hotel_service/hotel_service";
import styles from "./hotel_listing_page.module.css";
import { HotelListingsSummary } from "./hotel_listings_summary";
import { LoadingContent } from "./loading_content";
import { ReadyContent } from "./ready_content";
import { HotelListingsSkeleton } from "./skeleton/hotel_listings_skeleton";
import { HotelListingsSortOrderSelector } from "./sort_order_selector";
import { useHotelListings } from "./use_hotel_listings";

type HotelListingsPageProps = {
	hotelService: HotelService;
};

export const HotelListingsPage = ({ hotelService }: HotelListingsPageProps) => {
	const { sortOrder, setSortOrder, status, data, location, stayLengthNights } =
		useHotelListings(hotelService);

	const topLeft =
		status === "ready" ? (
			<HotelListingsSummary count={data.results.length} location={location} />
		) : undefined;

	const topRight = (
		<HotelListingsSortOrderSelector
			sortOrder={sortOrder}
			setSortOrder={setSortOrder}
		/>
	);

	// todo(josh): comprehensive components for the error case + empty response case
	let content: React.ReactNode;
	switch (status) {
		case "loading":
			content = <LoadingContent />;
			break;
		case "error":
			content = <Body>Sorry, there was a problem finding hotels.</Body>;
			break;
		case "ready":
			content =
				data.results.length === 0 ? (
					<Body>No results found.</Body>
				) : (
					<ReadyContent
						results={data.results}
						stayLengthNights={stayLengthNights}
					/>
				);
			break;
		default:
			status satisfies never;
	}

	return (
		<div className={styles.container}>
			<HotelListingsSkeleton
				logo={<img src={logo} alt="The Qantas logo" className={styles.logo} />}
				topLeft={topLeft}
				topRight={topRight}
				content={content}
			/>
		</div>
	);
};
