
export const getDescription = (weatherCode?: number): { text: string; icon: string } => {
    const status: { [key: number]: { text: string; icon: string } } = {
        0: { text: "Clear Sky", icon: "🌤️" },
        1: { text: "Mainly clear, partly cloudly and overcast", icon: "⛅️" },
        2: { text: "Mainly clear, partly cloudly and overcast", icon: "⛅️" },
        3: { text: "Mainly clear, partly cloudly and overcast", icon: "⛅️" },
        45: { text: "Fog and depositing rime fog", icon: "☁️" },
        48: { text: "Fog and depositing rime fog", icon: "☁️" },
        51: { text: "Drizzle: Light, moderate, and dense intensity", icon: "🌧️" },
        53: { text: "Drizzle: Light, moderate, and dense intensity", icon: "🌧️" },
        55: { text: "Drizzle: Light, moderate, and dense intensity", icon: "🌧️" },
        56: { text: "Freezing Drizzle", icon: "🌨️" },
        57: { text: "Freezing Drizzle", icon: "🌨️" },
        61: { text: "Slight rain", icon: "🌦️" },
        63: { text: "Moderate rain", icon: "🌧️" },
        65: { text: "Heavy rain", icon: "🌧️" },
        66: { text: "Light freezing rain", icon: "🌨️" },
        67: { text: "Heavy freezing rain", icon: "🌨️" },
        71: { text: "Slight snowfall", icon: "🌨️" },
        73: { text: "Moderate snowfall", icon: "🌨️" },
        75: { text: "Heavy snowfall", icon: "❄️" },
        77: { text: "Snow grains", icon: "❄️" },
        80: { text: "Slight rain showers", icon: "🌦️" },
        81: { text: "Moderate rain showers", icon: "🌧️" },
        82: { text: "Violent rain showers", icon: "⛈️" },
        85: { text: "Slight snow showers", icon: "🌨️" },
        86: { text: "Heavy snow showers", icon: "❄️" },
        95: { text: "Thunderstorm", icon: "⛈️" },
        96: { text: "Thunderstorm with hail", icon: "🌩️" },
        99: { text: "Heavy thunderstorm with hail", icon: "🌩️" },
    }

    return status[weatherCode ?? -1] || { text: "Unknown", icon: "?" };
}