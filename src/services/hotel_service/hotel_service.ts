import type { Result } from "./hotel_schema";

export type SortOrder = "low-first" | "high-first";

export type FindHotelsRequest = {
	sortOrder: SortOrder;
};

export type FindHotelsResponse = {
	results: Result[];
};

export interface HotelService {
	findHotels(request: FindHotelsRequest): Promise<FindHotelsResponse>;
}
