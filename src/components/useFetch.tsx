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



const useFetch = <T,>(props: FetchProps | null) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        if (!props) return;

        const { url, options } = props;
        const hourlyParams = options.hourly.join(",");
        const currentParams = "temperature_2m,weather_code";

        const getData = async () => {
            setLoading(true);
            setError(undefined);
            try {
                const response = await fetch(`${url}?latitude=${options.latitude}&longitude=${options.longitude}&hourly=${hourlyParams}&current=${currentParams}`)

                console.log(response)

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const enddata: T = await response.json();
                setData(enddata)
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }

        };
        getData();
    }, [props])
    return { data, loading, error }
}

export default useFetch