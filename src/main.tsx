import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { MockHotelClient } from "./services/hotel_service/mock_hotel_client.ts";

const hotelService = new MockHotelClient();

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: if root isn't there, then everything's over anyways
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App hotelService={hotelService} />
		</QueryClientProvider>
	</StrictMode>,
);
