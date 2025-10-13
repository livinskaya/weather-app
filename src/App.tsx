import './App.css'
import useFetch from './components/useFetch';
import { getDescription } from './components/getDescription';
import { getCurrentLocation } from './components/getCurrentLocation';
import { useEffect, useState } from 'react';
import { StateLoading } from './components/stateLoading';
import { StateError } from './components/stateError';
import { ForecastDaily } from './components/forecastDaily';
import { ForecastHourly } from './components/forecastHourly';
import { SearchBar } from './components/searchBar';

interface Location {
  latitude: number;
  longitude: number;
  name?: string
}
interface WeatherResponse {
  forecast_days: number[];
  daily: { time: string[], weather_code: number[], temperature_2m_max: number[], temperature_2m_min: number[] };
  current: { temperature_2m: number; weather_code: number };
  hourly: { time: string[]; temperature_2m: number[]; weather_code: number[] };
}

interface MapResponse {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
}

const App = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then((position => setLocation(position)))
      .catch((error) => {
        console.error("Unknown location", error)
      })
  }, [])

  const { data: mapData } = useFetch<MapResponse>(
    searchCity ? {
      url: "https://geocoding-api.open-meteo.com/v1/search",
      params: {
        name: searchCity,
        count: 1,
        language: "en",
        format: "json"
      }
    }
      : null
  )

  useEffect(() => {
    if (mapData?.results && mapData.results.length > 0) {
      const city = mapData.results[0];
      setLocation({
        latitude: city?.latitude ?? 0,
        longitude: city?.longitude ?? 0,
        name: `${city?.name}, ${city?.country}`
      })
    } else {
      console.error("Ungültige locaion")
    }

  }, [mapData])

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
      <SearchBar onSearch={setSearchCity} />
      <div className='text-white text-shadow-md'>
        <h1 className='text-2xl'>{location?.name ?? "Oldenburg"}</h1>
        <p className='text-5xl'>{temperature}°</p>
        <p className=''>{currentWeather?.text}</p>
      </div>
      {data && (
        <div>
          <ForecastHourly
            time={data?.hourly.time}
            temperature={data.hourly.temperature_2m}
            weather_code={data.hourly.weather_code}
          />

          <ForecastDaily
            time={data.daily.time}
            minTemp={data.daily.temperature_2m_min}
            maxTemp={data.daily.temperature_2m_max}
            weather_code={data.daily.weather_code}
          />
        </div>
      )}

    </div >
  )
}

//flow fields
export default App
