import { FindHotelsRequest, HotelService } from "./hotel_service";
import mockData from './mock_data.json';
import { RootSchema, Result } from "./hotel_schema";
import { z } from "zod";

export class MockHotelClient implements HotelService {
  private listings: Result[];

  constructor(private readonly syntheticDelayMs: number = 1000) {
    try {
      this.listings = RootSchema.parse(mockData).results;
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error('Please ensure mock data is well formed.', e.issues);
      } else {
        console.error('Error parsing mock data')
      }

      throw e;
    }
  }

  async findHotels(request: FindHotelsRequest) {
    await new Promise(res => setTimeout(res, this.syntheticDelayMs));

    let results = structuredClone(this.listings).toSorted(sortMethods[request.sortOrder])

    return { results };
  }
}

const sortMethods: Record<'high-first' | 'low-first', (a: Result, b: Result) => number> = {
  'high-first': (a, b) => b.offer.displayPrice.amount - a.offer.displayPrice.amount,
  'low-first': (a, b) => a.offer.displayPrice.amount - b.offer.displayPrice.amount,
}
