import type { Result } from "./hotel_schema";

export type FindHotelsRequest = {
	sortOrder: "low-first" | "high-first";
};

export type FindHotelsResponse = {
	results: Result[];
};

export interface HotelService {
	findHotels(request: FindHotelsRequest): Promise<FindHotelsResponse>;
}
