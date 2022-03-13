export const formatTemperature = (temp: number) => {
	return `${Math.round(temp)}°`
}

export const formatHumidity = (humidity: number) => {
	return `${humidity}%`
}

export const getWeatherIconUrl = (icon: string) => {
	return `http://openweathermap.org/img/wn/${icon}@2x.png`
}
