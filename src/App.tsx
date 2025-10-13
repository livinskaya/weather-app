import './App.css'
import useFetch from './components/useFetch';
import { getDescription } from './components/getDescription';
import { getCurrentLocation } from './components/getCurrentLocation';
import { useEffect, useState } from 'react';
import { StateLoading } from './components/stateLoading';
import { StateError } from './components/stateError';

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

  interface WeatherResponse {
    forecast_days: number[];
    daily: { time: string[], weather_code: number[], temperature_2m_max: number[], temperature_2m_min: number[] };
    current: { temperature_2m: number; weather_code: number };
    hourly: { time: string[]; temperature_2m: number[]; weather_code: number[] };
  }

  const { data, loading, error } = useFetch<WeatherResponse>(
    location
      ? {
        url: "https://api.open-meteo.com/v1/forecast",
        params: {
          latitude: location?.latitude,
          longitude: location?.longitude,
          forecast_days: 7,
          daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
          hourly: ["temperature_2m", "weather_code"],
          current: ["temperature_2m", "weather_code"],
        }

      }
      : null
  )
  const temperature = data?.current.temperature_2m
  const get_currentWeather = data?.current.weather_code
  const currentWeather = get_currentWeather !== undefined ? getDescription(get_currentWeather) : null;

  if (loading) {
    return (
      <StateLoading />
    )
  }

  if (error) {
    return (
      <StateError />
    )
  }

  return (


    <div className='flex flex-col items-center justify-center bg-linear-to-r from-blue-200 to-blue-400 h-screen text-center'>
      <div className='text-white text-shadow-md'>
        <h1 className='text-2xl'>Oldenburg</h1>
        <p className='text-5xl'>{temperature}°</p>
        <p className=''>{currentWeather?.text}</p>
      </div>
      <div className='flex flex-col bg-gray-100/20 w-125 rounded-[20px]'>
        {data?.daily?.time.length ? (
          data.daily.time.slice(0, 7).map((time, index) => {
            const date = new Date(time)
            const dayName = date.toLocaleDateString('en-EN', { weekday: 'long' })
            const weather = getDescription(data.daily.weather_code[index])

            return (
              <div className="grid grid-cols-4 text-white">
                <p className="text-left pl-2">{index === 0 ? "Today" : dayName}</p>
                <p>{weather.icon}</p>
                <p>{data.daily.temperature_2m_min[index]}°</p>
                <p className=''>{data.daily.temperature_2m_max[index]}°</p>
              </div>
            );
          })
        ) : (<p className="text-white">Keine 7 Tägliche Daten verfügbar</p>

        )}
      </div>

    </div >
  )
}

//flow fields
export default App
