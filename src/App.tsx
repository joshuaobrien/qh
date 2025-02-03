import './App.css'
import { useFindHotels } from './services/hotel_service/hotel_queries'
import { HotelService } from './services/hotel_service/hotel_service'

type AppProps = {
  hotelService: HotelService;
}

function App({ hotelService }: AppProps) {
  const { data } = useFindHotels(hotelService, { sortOrder: 'low-first' })

  return (
    <div>
      { JSON.stringify(data) }
    </div>
  )
}

export default App
