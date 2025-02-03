import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import { HotelService } from "../../services/hotel_service/hotel_service"
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
  const content = (
    JSON.stringify(data.results)
  );

  return (
    <HotelListingsSkeleton
      topLeft={topLeft}
      topRight={topRight}
      content={content}
    />
  );
}
