import { useQuery } from "@tanstack/react-query";
import type { FindHotelsRequest, HotelService } from "./hotel_service";

export function useFindHotels(
  hotelService: HotelService,
  request: FindHotelsRequest,
) {
  return useQuery({
    queryKey: [request.sortOrder],
    queryFn: () => hotelService.findHotels(request),
  });
}
