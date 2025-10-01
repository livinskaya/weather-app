import './App.css'
import useFetch from './components/useFetch';

const App = () => {

  const { data, loading, error } = useFetch({
    url: "https://api.open-meteo.com/v1/forecast",
    options: {
      latitude: 18.67,
      longitude: 10.65,
      hourly: ["temperature_2m", "weather_code"]
    }
  })

  const getDescription = (weatherCode: number): string => {
    const status: { [key: number]: string } = {
      0: "Clear Sky",
      1: "Mainly clear, partly cloudly and overcast",
      2: "Mainly clear, partly cloudly and overcast",
      3: "Mainly clear, partly cloudly and overcast"
    }
    return status[weatherCode] || "Unknow status";
  }

  const temperature = data?.hourly?.temperature_2m?.[0]
  const weather_code = data?.hourly?.weather_code?.[0]
  const weather_status = weather_code !== undefined ? getDescription(weather_code) : '';

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
