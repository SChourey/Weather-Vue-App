export interface WeatherResponseInterface {
	current: HourlyInterface;
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	hourly: HourlyInterface[];
    daily: DailyInterface[];
    minutely: MinutelyInterface[]
}

export interface WeatherInterface {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface HourlyInterface {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherInterface[];
	pop?: number;
}

export interface DailyInterface {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: TempInterface;
	feels_like: FeelsLikeInterface;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherInterface[];
}

export interface TempInterface {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}

export interface FeelsLikeInterface {
	day: number;
	night: number;
	eve: number;
	morn: number;
}

export interface MinutelyInterface {
	dt: number;
	precipitation: number;
}