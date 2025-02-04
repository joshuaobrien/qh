import { z } from "zod";
import { type Result, RootSchema } from "./hotel_schema";
import type { FindHotelsRequest, HotelService } from "./hotel_service";
import mockData from "./mock_data.json";

// note: there aren't any tests for this, as in the real world
// the service client would be making calls to a real backend.
// this implementation is purely for local use, so tests do not
// provide much value
export class MockHotelClient implements HotelService {
	private listings: Result[];

	constructor(private readonly syntheticDelayMs: number = 1000) {
		try {
			this.listings = RootSchema.parse(mockData).results;
		} catch (e) {
			if (e instanceof z.ZodError) {
				console.error("Please ensure mock data is well formed.", e.issues);
			} else {
				console.error("Error parsing mock data");
			}

			throw e;
		}
	}

	async findHotels(request: FindHotelsRequest) {
		await new Promise((res) => setTimeout(res, this.syntheticDelayMs));

		const results = structuredClone(this.listings).toSorted(
			sortMethods[request.sortOrder],
		);

		return { results };
	}
}

const sortMethods: Record<
	"high-first" | "low-first",
	(a: Result, b: Result) => number
> = {
	"high-first": (a, b) =>
		b.offer.displayPrice.amount - a.offer.displayPrice.amount,
	"low-first": (a, b) =>
		a.offer.displayPrice.amount - b.offer.displayPrice.amount,
};
