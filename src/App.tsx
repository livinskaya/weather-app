import './App.css'
import useFetch from './components/useFetch';
import { getDescription } from './components/getDescription';

const App = () => {

  const { data, loading, error } = useFetch({
    url: "https://api.open-meteo.com/v1/forecast",
    options: {
      latitude: 18.67,
      longitude: 10.65,
      hourly: ["temperature_2m", "weather_code"]
    }
  })

  const temperature = data?.hourly?.temperature_2m?.[0]
  const weather_code = data?.hourly?.weather_code?.[0]
  const weather_status = weather_code !== undefined ? getDescription(weather_code) : '';

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center bg-linear-to-r from-blue-200 to-blue-400 h-screen text-center'>
        <h1 className='text-3xl text-white'>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center bg-linear-to-r from-red-200 to-red-400 h-screen text-center'>
        <h1 className='text-3xl text-white'>error.message
        </h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center bg-linear-to-r from-blue-200 to-blue-400 h-screen text-center'>
      <div className='text-white text-shadow-md'>
        <h1 className='text-2xl'>Oldenburg</h1>
        <p className='text-5xl'>{temperature}</p>
        <p className=''>{weather_status}</p>
      </div>
      <div className='bg-gray-100/20 rounded-md' >

      </div>
    </div>
  )
}

//flow fields
export default App
