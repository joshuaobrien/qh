import './App.css'
import { HotelListingsPage } from './features/hotel_listings/hotel_listings_page';
import { HotelService } from './services/hotel_service/hotel_service'

type AppProps = {
  hotelService: HotelService;
}

function App({ hotelService }: AppProps) {
  return (
    <HotelListingsPage hotelService={hotelService} />
  )
}

export default App
