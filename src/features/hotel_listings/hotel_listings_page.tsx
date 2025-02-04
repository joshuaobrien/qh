import { useState } from "react";
import { SquareLoader, TextLoader } from "../../design_system/loader";
import logo from "../../design_system/logo.png";
import { Body, Subtitle, Title } from "../../design_system/typography";
import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import type {
	HotelService,
	SortOrder,
} from "../../services/hotel_service/hotel_service";
import styles from "./hotel_listing_page.module.css";
import { HotelListingsSummary } from "./hotel_listings_summary";
import { ItemImage } from "./list/item/image/item_image";
import { ItemSkeleton } from "./list/item/item_skeleton";
import { Price } from "./list/item/price";
import { Rating } from "./list/item/rating/rating";
import { HotelListingsSkeleton } from "./skeleton/hotel_listings_skeleton";
import { HotelListingsSortOrderSelector } from "./sort_order_selector";

type HotelListingsPageProps = {
	hotelService: HotelService;
};

export const HotelListingsPage = ({ hotelService }: HotelListingsPageProps) => {
	const [sortOrder, setSortOrder] = useState<SortOrder>("high-first");
	const { isPending, error, data } = useFindHotels(hotelService, { sortOrder });

	const topLeft =
		isPending || error ? (
			<Body /> // no need to show anything here, but let's put something in the slot (thanks flexbox)
		) : (
			<HotelListingsSummary count={data.results.length} location="Sydney" />
		);

	const topRight = (
		<HotelListingsSortOrderSelector
			sortOrder={sortOrder}
			setSortOrder={setSortOrder}
		/>
	);

	// todo(josh): comprehensive components for the error case + empty response case
	const content =
		isPending || error ? (
			error ? (
				<Body>Sorry, there was a problem finding hotels.</Body>
			) : (
				<ul aria-label="Loading">
					{Array(5)
						.fill(undefined)
						.map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is fine here, it's a static array
							<li key={i} aria-hidden>
								<ItemSkeleton
									image={<SquareLoader />}
									title={<TextLoader />}
									rating={<TextLoader />}
									address={<TextLoader />}
									room={<TextLoader />}
									promotion={<TextLoader />}
									price={undefined}
									savings={undefined}
									priceLabel={undefined}
								/>
							</li>
						))}
				</ul>
			)
		) : (
			<ul>
				{data.results.map((result) => (
					<li key={result.id}>
						<ItemSkeleton
							image={
								<ItemImage
									imageUrl={result.property.previewImage.url}
									description={result.property.previewImage.caption}
								/>
							}
							imageLabel={
								<Body color="red">{result.offer.promotion.title}</Body>
							}
							title={<Title>{result.property.title}</Title>}
							address={
								<Subtitle color="grey">
									{result.property.address.join(", ")}
								</Subtitle>
							}
							rating={
								<Rating
									rating={result.property.rating.ratingValue}
									kind={result.property.rating.ratingType}
								/>
							}
							room={<Body color="red">{result.offer.name}</Body>}
							promotion={
								result.offer.cancellationOption.cancellationType ===
								"FREE_CANCELLATION" ? (
									<Body color="green">{"Free cancellation"}</Body>
								) : undefined
							}
							price={<Price value={result.offer.displayPrice.amount} />}
							savings={
								<Body color="red" isBold>
									{result.offer.savings != null
										? `Save $${result.offer.savings.amount}~`
										: undefined}
								</Body>
							}
							priceLabel={
								<>
									<Body isBold>1</Body>
									<Body>{` night total ${result.offer.displayPrice.currency}`}</Body>
								</>
							}
						/>
					</li>
				))}
			</ul>
		);

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
