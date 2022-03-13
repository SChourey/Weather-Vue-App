import {DailyInterface, HourlyInterface} from './api'

export interface City {
	city_id: number
	city_name: string
	state_code: string
	country_code: string
	country_full: string
	lat: number
	lon: number
}

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>
}

interface CustomHourlyWeatherInterface extends Omit<DeepPartial<HourlyInterface>, 'weather'> {
	weather: {
		icon?: string
		description?: string
	}
}

interface CustomDailyWeatherInterface extends Omit<DeepPartial<DailyInterface>, 'weather'> {
	weather: {
		icon?: string
		description?: string
	}
}

export interface WeatherInfoInterface {
	hourly: CustomHourlyWeatherInterface[]
	daily: CustomDailyWeatherInterface[]
}

export interface CityCoordinates {
	lon: number
	lat: number
}

export interface ApiResponseInterface<T> {
	data: T | null
	errorMessage: string | null
}
