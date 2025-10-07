import useFetch from '../components/useFetch';
import { getDescription } from '../components/getDescription';


export const getDayWeather = () => {
    <div className='flex w-125 bg-gray-100/20 rounded-[20px] overflow-x-scroll m-5 p-5' >
        {data?.hourly.time?.slice(0, 12).map((time: string, index: number) => {
            const todayWeather = getDescription(data?.hourly.weather_code[index])

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
                        {Math.round(data.hourly.temperature_2m[index])}
                    </p>
                </div>
            );
        })}
    </div>
}