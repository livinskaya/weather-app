import { getDescription } from "./getDescription";

interface ForecastDailyProps {
    time: string[];
    minTemp: number[];
    maxTemp: number[];
    weather_code: number[];
}

export const ForecastDaily = ({ time, minTemp, maxTemp, weather_code }: ForecastDailyProps) => {
    if (!time || time.length === 0) {
        return <p className="text-white p-2">Keine 7 Tägige Daten gefunden</p>
    }

    return (
        <div className="flex flex-col bg-gray-100/20 w-125 rounded-[20px] m-5 p-5">
            {time.slice(0, 7).map((t, index) => {
                const date = new Date(t);
                const dayName = date.toLocaleDateString("en-EN", { weekday: "long" });
                const desc = getDescription(weather_code[index])
                return (
                    <div key={t} className="grid grid-cols-4 text-white p-2">
                        <p className="text-left">{index === 0 ? "Today" : dayName}</p>
                        <p>{desc.icon}</p>
                        <p>{minTemp[index]}°</p>
                        <p>{maxTemp[index]}°</p>
                    </div>
                )

            })}

        </div>
    )
}