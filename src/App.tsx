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
          hourly: ["temperature_2m", "weather_code"],
          current: ["temperature_2m", "weather_code"]
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
      <div className='flex w-125 bg-gray-100/20 rounded-[20px] overflow-x-scroll m-5 p-5' >
        {data?.hourly?.time.length ? (
          (() => {
            const now = new Date()
            const currentHourIndex = data.hourly.time.findIndex(time => new Date(time) >= now)
            const hourlySlice = data.hourly.time.slice(currentHourIndex, currentHourIndex + 12)

            return hourlySlice.map((time, index) => {
              const indx = currentHourIndex + index;
              const todayWeather = getDescription(data.hourly.weather_code[indx]);

              return (
                < div
                  key={time}
                  className="inline-block flex-shrink-0 w-[50px] text-center mr-5"
                >
                  <p className='text-sm text-white'>
                    {index === 0 ? 'Now' : new Date(time).getHours() + ' Uhr'}
                  </p>
                  <p>{todayWeather.icon}</p>

                  <p className='text-lg text-white'>
                    {Math.round(data.hourly.temperature_2m[index] ?? 0)}°
                  </p>
                </div>
              );
            });
          })()
        ) : (<p>Keine Stündlichen Daten verfügbar</p>
        )}
      </div>
    </div >
  )
}

//flow fields
export default App
