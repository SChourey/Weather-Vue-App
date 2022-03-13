import {ApiResponseInterface, City, CityCoordinates, WeatherInfoInterface} from '@/models/application'

import {apiClient} from '@/utils/api-client'

class WeatherDataService {
	// Get Pre Defined City Data
	getPreDefinedCitiesData() {
		return apiClient.get<ApiResponseInterface<City[]>>({
			url: `preDefinedCitiesData`,
		})
	}

	// Get Current City Weather Info
	getCurrentCityWeatherInfo(queryParams: CityCoordinates) {
		return apiClient.get<ApiResponseInterface<WeatherInfoInterface>>({
			url: `getCurrentCityWeatherInfo`,
			queryParams,
		})
	}

	// Get Search City Results
	getSearchCityResults(queryParams: Record<string, string>) {
		return apiClient.get<ApiResponseInterface<City[]>>({
			url: `getSearchCityResults`,
			queryParams,
		})
	}
}

export default new WeatherDataService()
