import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MockHotelClient } from './services/hotel_service/mock_hotel_client.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const hotelService = new MockHotelClient();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App hotelService={hotelService} />
    </QueryClientProvider>
  </StrictMode>,
)
