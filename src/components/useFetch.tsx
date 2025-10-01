import { useEffect, useState } from "react"


interface RequestParams {
    longitude: number;
    latitude: number;
    hourly: string[];
}

interface FetchProps {
    url: string;
    options: RequestParams;
}

interface WeatherData {
    hourly: {
        temperature_2m: number[];
        weather_code: number[];
    }
}


const useFetch = ({ url, options }: FetchProps) => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null)
    const hourlyParams = options.hourly.join(',');

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(undefined);
            try {
                const response = await fetch(`${url}?latitude=${options.latitude}&longitude=${options.longitude}&hourly=${hourlyParams}`)

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const enddata = await response.json();
                setData(enddata)
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }

        };
        getData();
    }, [url, options.latitude, options.longitude, hourlyParams])

    return { data, loading, error }
}

export default useFetch

// async loading, ref try catch function drin schreiben