import { useEffect, useState } from "react"


interface FetchProps<Params extends Record<string, ParamValueType>> {
    url: string;
    params?: Params;
}
type ParamValueType = string | number | boolean | Array<string | number | boolean>

const buildURLString = (params: Record<string, ParamValueType>) => {
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

const useFetch = <Data, Params extends Record<string, ParamValueType> = Record<string, ParamValueType>>(
    props: FetchProps<Params> | null
) => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>()

    useEffect(() => {
        if (!props) return;

        const { url, params } = props;

        const fetchData = async () => {
            setLoading(true);
            setError(undefined);
            try {
                const URLString = params ? `?${buildURLString(params)}` : "";
                const response = await fetch(`${url}${URLString}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const json = (await response.json()) as Data;
                setData(json)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                    return;
                }
                console.error(error)
            } finally {
                setLoading(false);
            }

        };
        fetchData().catch((error) => console.log(error));
    }, [props])
    return { data, loading, error }
}

export default useFetch