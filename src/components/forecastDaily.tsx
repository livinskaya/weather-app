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

}