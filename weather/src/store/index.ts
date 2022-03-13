import {createStore} from 'vuex'
import WeatherService from '@/services/weather.service'
import {Commit} from 'vuex'
import {City, CityCoordinates, WeatherInfoInterface} from '@/models/application'
import {apiClient} from '@/utils/api-client'

interface State {
	showLoader: boolean
	preDefinedCities: City[]
	currentCityWeatherInfo: WeatherInfoInterface | null
	appError: {}
	searchCityResults: City[]
	currentSearchedCity: City | null
}

export default createStore({
	state: {
		showLoader: false,
		preDefinedCities: [],
		currentCityWeatherInfo: null,
		appError: '',
		searchCityResults: [],
		currentSearchedCity: null,
	},

	mutations: {
		setPreDefinedCitiesData(state: State, payload: City[]) {
			state.preDefinedCities = payload
			state.showLoader = true
		},
		setAppError(state: State, value: {}) {
			state.appError = value
		},
		setShowLoader(state: State, value: boolean) {
			state.showLoader = value
		},
		setCurrentCityWeatherInfo(state: State, value: WeatherInfoInterface) {
			state.currentCityWeatherInfo = value
		},
		setSearchCityResults(state: State, value: City[]) {
			state.searchCityResults = value
		},
		setCurrentSearchedCity(state: State, value: City) {
			state.currentSearchedCity = value
		},
	},
	actions: {
		async getPreDefinedCitiesData({commit}: {commit: Commit}) {
			commit('setShowLoader', true)
			try {
				const result = await WeatherService.getPreDefinedCitiesData()
				if (result.data) {
					commit('setPreDefinedCitiesData', result.data)
				} else {
					commit('setAppError', result.errorMessage)
				}
				commit('setShowLoader', false)
			} catch (err) {
				commit('setAppError', apiClient.serverErrorMessage)
				commit('setShowLoader', false)
			}
		},

		async getCurrentCityWeatherInfo({commit}: {commit: Commit}, payload: CityCoordinates) {
			commit('setShowLoader', true)
			try {
				const result = await WeatherService.getCurrentCityWeatherInfo(payload)
				if (result.data) {
					commit('setCurrentCityWeatherInfo', result.data)
				} else {
					commit('setAppError', result.errorMessage)
				}
				commit('setShowLoader', false)
			} catch (err) {
				commit('setAppError', apiClient.serverErrorMessage)
				commit('setShowLoader', false)
			}
		},

		async getSearchCityResults({commit}: {commit: Commit}, payload: string) {
			try {
				const result = await WeatherService.getSearchCityResults({
					query: payload,
				})

				if (result.data) {
					commit('setSearchCityResults', result.data)
				} else {
					commit('setAppError', result.errorMessage)
				}
				return result
			} catch (err) {
				commit('setAppError', apiClient.serverErrorMessage)
				commit('setShowLoader', false)
			}
		},

		async getCurrentSearchedCity({commit}: {commit: Commit}, payload: string) {
			commit('setCurrentSearchedCity', payload)
		},
	},
})
