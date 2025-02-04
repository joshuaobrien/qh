import { useState } from "react";
import { useFindHotels } from "../../services/hotel_service/hotel_queries";
import type {
	HotelService,
	SortOrder,
} from "../../services/hotel_service/hotel_service";

export const useHotelListings = (hotelService: HotelService) => {
	const location = "Sydney";
	const stayLengthNights = 1;
	const [sortOrder, setSortOrder] = useState<SortOrder>("high-first");
	const { isPending, error, data } = useFindHotels(hotelService, { sortOrder });

	const sharedValues = {
		sortOrder,
		setSortOrder,
		location,
		stayLengthNights,
	};

	if (isPending) {
		return {
			...sharedValues,
			status: "loading",
			data: undefined,
		} as const;
	}

	if (error) {
		return {
			...sharedValues,
			status: "error",
			data: undefined,
		} as const;
	}

	return { ...sharedValues, status: "ready", data } as const;
};
