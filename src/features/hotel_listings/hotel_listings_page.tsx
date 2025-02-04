import { Body, Emphasis, Subtitle, Title } from "../../design_system/typography";
import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import { HotelService } from "../../services/hotel_service/hotel_service"
import { ItemImage } from "./list/item/image/item_image";
import { ItemSkeleton } from "./list/item/item_skeleton";
import { Rating } from "./list/item/rating/rating";
import { HotelListingsSkeleton } from "./skeleton/hotel_listings_skeleton";
import styles from './hotel_listing_page.module.css';

type HotelListingsPageProps = {
  hotelService: HotelService;
}

export const HotelListingsPage = ({ hotelService }: HotelListingsPageProps) => {
  const { isPending, error, data } = useFindHotels(hotelService, { sortOrder: 'high-first' });

  if (isPending) {
    return "Loading..."
  }

  if (error) {
    return "Something went wrong"
  }

  const topLeft = (
    <div>
      {"Listings summary"}
    </div>
  );
  const topRight = (
    <div>
      {"Filter selector"}
    </div>
  );

  const content = (
    <ul>
      {
        data.results.map(result => (
          <li>
            <ItemSkeleton
              image={<ItemImage imageUrl={result.property.previewImage.url} />}
              imageLabel={<Body color="red">{result.offer.promotion.title}</Body>}
              title={<Title>{result.property.title}</Title>}
              address={<Subtitle color="grey">{result.property.address.join(', ')}</Subtitle>}
              // todo(josh): see if we can type this more strongly
              rating={<Rating rating={result.property.rating.ratingValue} kind={result.property.rating.ratingType as 'star' | 'self'} />}
              room={<Body color="red">{result.offer.name}</Body>}
              promotion={<Body color="green">{result.offer.cancellationOption.cancellationType}</Body>}
              price={<Emphasis>{result.offer.displayPrice.amount}</Emphasis>}
              savings={<Body color="red">{result.offer.savings != null ? `Save ${result.offer.savings?.amount}~` : undefined}</Body>}
              priceLabel={<Body>{`1 night total ${result.offer.displayPrice.currency}`}</Body>}
            />
           </li>
        ))
      }
    </ul>
  )

  return (
    <div className={styles.container}>
      <HotelListingsSkeleton
        topLeft={topLeft}
        topRight={topRight}
        content={content}
      />
    </div>
  );
}
