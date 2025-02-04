import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	cleanup,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
	FindHotelsResponse,
	HotelService,
} from "../../services/hotel_service/hotel_service";
import { HotelListingsPage } from "./hotel_listings_page";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false } },
});

const mockHotelsData: FindHotelsResponse = {
	results: [
		{
			id: "1",
			property: {
				title: "Hotel Sydney",
				address: ["123 Main St", "Sydney"],
				previewImage: {
					url: "https://example.com/hotel_sydney.jpg",
					caption: "",
					imageType: "PRIMARY",
				},
				rating: { ratingValue: 4.5, ratingType: "star" },
				propertyId: "sydney-1",
			},
			offer: {
				name: "Deluxe Room",
				displayPrice: { amount: 200, currency: "AUD" },
				cancellationOption: { cancellationType: "FREE_CANCELLATION" },
				savings: { amount: 50, currency: "AUD" },
				promotion: {
					title: "",
					type: "MEMBER",
				},
			},
		},
		{
			id: "2",
			property: {
				title: "Luxury Melbourne",
				address: ["456 Collins St", "Melbourne"],
				previewImage: {
					url: "https://example.com/hotel_melbourne.jpg",
					caption: "",
					imageType: "PRIMARY",
				},
				rating: { ratingValue: 5, ratingType: "star" },
				propertyId: "melbourne-2",
			},
			offer: {
				name: "Executive Suite",
				displayPrice: { amount: 350, currency: "AUD" },
				cancellationOption: { cancellationType: "NOT_REFUNDABLE" },
				savings: { amount: 75, currency: "AUD" },
				promotion: {
					title: "",
					type: "MEMBER",
				},
			},
		},
	],
};

describe("HotelListingsPage", () => {
	let hotelService: HotelService;

	beforeEach(() => {
		hotelService = { findHotels: vi.fn() };
	});

	afterEach(() => {
		cleanup();
		queryClient.clear();
	});

	const renderWithQueryClient = (ui: React.ReactNode) =>
		render(
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
		);

	it("renders loading state", async () => {
		vi.mocked(hotelService).findHotels.mockReturnValue(new Promise(() => {}));
		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);
		expect(screen.getByRole("list")).toBeDefined();
		expect(screen.getByLabelText("Loading")).toBeDefined();
	});

	it("renders error state", async () => {
		vi.mocked(hotelService).findHotels.mockRejectedValue(
			new Error("Failed to fetch hotels"),
		);
		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);
		await waitFor(() => {
			expect(screen.queryByRole("list")).toBeNull();
			expect(
				screen.getByText("Sorry, there was a problem finding hotels."),
			).toBeDefined();
		});
	});

	it("renders hotel listings when data is available", async () => {
		vi.mocked(hotelService).findHotels.mockResolvedValue(mockHotelsData);
		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);
		await waitFor(() => {
			expect(screen.getByText("Hotel Sydney")).toBeDefined();
			expect(screen.getByText("123 Main St, Sydney")).toBeDefined();
			expect(screen.getByText("Deluxe Room")).toBeDefined();
			expect(screen.getByText("Free cancellation")).toBeDefined();
			expect(screen.getByText("Save $50~")).toBeDefined();
		});
	});

	it("applies default sorting order on initial render", async () => {
		vi.mocked(hotelService).findHotels.mockResolvedValue(mockHotelsData);
		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);
		expect(vi.mocked(hotelService).findHotels).toHaveBeenLastCalledWith({
			sortOrder: "high-first",
		});
	});

	it("changes sort order and verifies correct sorting", async () => {
		vi.mocked(hotelService).findHotels.mockResolvedValue(mockHotelsData);
		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);
		expect(vi.mocked(hotelService).findHotels).toHaveBeenLastCalledWith({
			sortOrder: "high-first",
		});
		const select = screen.getByRole("combobox");
		await userEvent.selectOptions(select, "low-first");
		expect(vi.mocked(hotelService).findHotels).toHaveBeenLastCalledWith({
			sortOrder: "low-first",
		});
		expect(vi.mocked(hotelService.findHotels)).toHaveBeenCalledTimes(2);
	});

	it("only advertises free cancellation if there is a free cancellation offer", async () => {
		vi.mocked(hotelService).findHotels.mockResolvedValue(mockHotelsData);

		renderWithQueryClient(<HotelListingsPage hotelService={hotelService} />);

		const hotelSydneyElement = await screen.findByText("Hotel Sydney");

		const hotelSydneyListItem = hotelSydneyElement.closest("li");
		expect(hotelSydneyListItem).not.toBeNull();
		expect(
			// biome-ignore lint/style/noNonNullAssertion: there's a check above
			within(hotelSydneyListItem!).queryByText("Free cancellation"),
		).toBeDefined();
		expect(screen.getAllByText("Free cancellation")).toHaveLength(1);
	});

	it("matches snapshot for a loaded list of hotels", async () => {
		vi.mocked(hotelService).findHotels.mockResolvedValue(mockHotelsData);
		const { container } = renderWithQueryClient(
			<HotelListingsPage hotelService={hotelService} />,
		);
		await screen.findByText("Hotel Sydney");
		expect(container).toMatchSnapshot();
	});
});
