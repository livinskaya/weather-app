import { useEffect, useState } from "react"


interface FetchProps<Params extends Record<string, unknown>> {
    url: string;
    params?: Params;
}

const buildURLString = (params: Record<string, unknown>) => {
    const url = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            url.append(key, value.join(","))
        } else if (value !== undefined && value !== null && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
            url.append(key, String(value));
        }
    });
    return url.toString()
}

const useFetch = <Data, Params extends Record<string, unknown> = Record<string, unknown>>(
    props: FetchProps<Params> | null
) => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        if (!props) return;

        const { url, params } = props;

        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const URLString = params ? `?${buildURLString(params)}` : "";
                const response = await fetch(`${url}${URLString}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const json = (await response.json()) as Data;
                setData(json)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }

        };
        getData().catch((error) => console.log(error));
    }, [props])
    return { data, loading, error }
}

export default useFetch