import { Body, Subtitle, Title } from "../../design_system/typography";
import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import { HotelService } from "../../services/hotel_service/hotel_service"
import { ItemImage } from "./list/item/image/item_image";
import { ItemSkeleton } from "./list/item/item_skeleton";
import { Rating } from "./list/item/rating/rating";
import { HotelListingsSkeleton } from "./skeleton/hotel_listings_skeleton";
import styles from './hotel_listing_page.module.css';
import { Price } from "./list/item/price";
import { HotelListingsSorderOrderSelector } from "./sort_order_selector";
import { useState } from "react";
import { HotelListingsSummary } from "./hotel_listings_summary";
import { SquareLoader, TextLoader } from "../../design_system/loader";
import logo from "../../design_system/logo.png";

type HotelListingsPageProps = {
  hotelService: HotelService;
}

export const HotelListingsPage = ({ hotelService }: HotelListingsPageProps) => {
  const [sortOrder, setSortOrder] = useState<'high-first' | 'low-first'>('high-first');
  const { isPending, error, data } = useFindHotels(hotelService, { sortOrder });

  const topLeft = isPending || error ? (
    <Body />
  ) : (
    <HotelListingsSummary count={data.results.length} location="Sydney" />
  )

  const topRight = (
    <HotelListingsSorderOrderSelector
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  )

  // todo(josh): comprehensive components for the error case + empty response case
  const content = isPending || error ? (
    <ul>
      {
        Array(5).fill(undefined).map((_, i) => (
          <li key={i}>
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
        ))

      }
    </ul>
  ) : (
    <ul>
      {
        data.results.map(result => (
          <li key={result.id}>
            <ItemSkeleton
              image={<ItemImage imageUrl={result.property.previewImage.url} />}
              imageLabel={<Body color="red">{result.offer.promotion.title}</Body>}
              title={<Title>{result.property.title}</Title>}
              address={<Subtitle color="grey">{result.property.address.join(', ')}</Subtitle>}
              // todo(josh): see if we can type this more strongly
              rating={<Rating rating={result.property.rating.ratingValue} kind={result.property.rating.ratingType as 'star' | 'self'} />}
              room={<Body color="red">{result.offer.name}</Body>}
              // todo(josh): see if we can type this more strongly
              promotion={result.offer.cancellationOption.cancellationType === 'FREE_CANCELLATION' ? <Body color="green">{"Free cancellation"}</Body> : undefined}
              price={<Price value={result.offer.displayPrice.amount} />}
              savings={<Body color="red" isBold>{result.offer.savings != null ? `Save $${result.offer.savings?.amount}~` : undefined}</Body>}
              priceLabel={<><Body isBold>1</Body><Body>{` night total ${result.offer.displayPrice.currency}`}</Body></>}
            />
          </li>
        ))
      }
    </ul>
  )

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
}
