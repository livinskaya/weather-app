import './App.css'
import useFetch from './components/useFetch';
import { getDescription } from './components/getDescription';
import { getCurrentLocation } from './components/getCurrentLocation';
import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const App = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then(setLocation)
      .catch((error) => {
        console.error("Unknown location", error)
      })
  }, [])

  const { data, loading, error } = useFetch(
    location
      ? {
        url: "https://api.open-meteo.com/v1/forecast",
        options: {
          latitude: location.latitude,
          longitude: location.longitude,
          hourly: ["temperature_2m", "weather_code"]
        },
      }
      : null
  );

  const temperature = data?.current.temperature_2m
  const weather_code = data?.current.weather_code
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
