import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import { HotelService } from "../../services/hotel_service/hotel_service"
import { ItemSkeleton } from "./list/item/item_skeleton";
import { HotelListingsSkeleton } from "./skeleton/hotel_listings_skeleton";

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

  const content = data.results.map(result => (
    <ItemSkeleton
      image={result.property.previewImage.url}
      imageLabel={result.offer.promotion.title}
      title={result.property.title}
      address={result.property.address.join(', ')}
      rating={result.property.rating.ratingValue}
      room={result.offer.name}
      promotion={result.offer.cancellationOption.cancellationType}
      price={result.offer.displayPrice.amount}
      savings={result.offer.savings?.amount}
      priceLabel={`1 night total ${result.offer.displayPrice.currency}`}
    />
  ));

  return (
    <HotelListingsSkeleton
      topLeft={topLeft}
      topRight={topRight}
      content={content}
    />
  );
}
