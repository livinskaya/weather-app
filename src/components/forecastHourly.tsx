import { getDescription } from "./getDescription";

interface ForecastHourlyParams {
    time: string[];
    temperature: number[];
    weather_code: number[];
}

export const ForecastHourly = ({ time, temperature, weather_code }: ForecastHourlyParams) => {
    if (!time || time.length === 0) {
        return <p className="text-white">Keine Stündlichen Daten verfügbar</p>
    }

    const now = new Date()
    const currentHourIndex = time.findIndex(time => new Date(time) >= now)
    const hourlySlice = time.slice(currentHourIndex, currentHourIndex + 12)

    return (
        <div className="flex w-125 bg-gray-100/20 rounded-[20px] overflow-x-scroll m-5 p-5">
            {hourlySlice.map((t, index) => {
                const indx = currentHourIndex + index;
                const desc = getDescription(weather_code[indx]);
                return (
                    <div key={t} className="inline-block flex-shrink-0 w-[50px] text-center mr-5">
                        <p className="text-sm text-white"> {index === 0 ? "Now" : new Date(t).getHours() + " Uhr"}</p>
                        <p>{desc.icon}</p>
                        <p className="text-lg text-white">{temperature[indx]}°</p>
                    </div>
                )
            })}
        </div>
    )
} 