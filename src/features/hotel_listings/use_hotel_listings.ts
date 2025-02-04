import { useState } from "react";
import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import type {
	HotelService,
	SortOrder,
} from "../../services/hotel_service/hotel_service";

export const useHotelListings = (hotelService: HotelService) => {
	const [sortOrder, setSortOrder] = useState<SortOrder>("high-first");
	const { isPending, error, data } = useFindHotels(hotelService, { sortOrder });

	if (isPending) {
		return {
			sortOrder,
			setSortOrder,
			status: "loading",
			data: undefined,
		} as const;
	}

	if (error) {
		return {
			sortOrder,
			setSortOrder,
			status: "error",
			data: undefined,
		} as const;
	}

	return { sortOrder, setSortOrder, status: "ready", data } as const;
};
