<template>
	<!-- Loader -->
	<div class="loader-section max-h-screen max-w-screen" v-if="$store.state.showLoader">
		<img src="@/assets/images/loader.gif" class="w-20 h-20 absolute top-1/2" />
	</div>

	<!-- Error Handling -->
	<div class="error-section app-wt-padding max-h-screen max-w-screen" v-if="$store.state.appError">
		<label class="fixed top-1/2 opacity-100"
			><span class="h3">{{ $store.state.appError }}</span></label
		>
	</div>

	<div class="wrapper">
		<!-- Search -->
		<CitySearch class="app-wt-padding-4 sm:app-wt-padding-2" placeholderText="Search weather by city" @on-city-select="onCitySelect"></CitySearch>

		<!-- Tabs -->
		<div class="tab-section app-wt-center app-wt-row">
			<div
				class="app-wt-padding-4 sm:px-1 sm:py-2 xl:h3 lg:h4 md:h4 sm:h5 m-0"
				v-bind:class="[isTabActive[item.city_id] ? 'text-neutral-800 border-b-2 border-highlight-600' : 'text-neutral-500']"
				@click="loadCurrentCityWeatherInfo(item)"
				v-for="item of $store.state.preDefinedCities"
				:key="item.city_id"
			>
				{{ item?.city_name }}
			</div>
			<div
				class="app-wt-padding-4 sm:px-1 sm:py-2 xl:h3 lg:h4 md:h4 sm:h5"
				v-if="$store.state.currentSearchedCity"
				v-bind:class="[isTabActive[$store.state.currentSearchedCity.city_id] ? 'text-neutral-800 border-b-2 border-highlight-600' : 'text-neutral-500']"
				@click="loadCurrentCityWeatherInfo($store.state.currentSearchedCity)"
			>
				{{ $store.state.currentSearchedCity.city_name }}
			</div>
		</div>

		<!-- Weather Details-->
		<div>
			<WeatherInfo :weatherData="$store.state.currentCityWeatherInfo"></WeatherInfo>
			<footer class="footer">Last updated on {{ lastUpdatedTime }}</footer>
		</div>
	</div>
</template>

<script lang="ts">
	import WeatherInfo from '@/components/WeatherInfo.vue'
	import CitySearch from '@/components/CitySearch.vue'
	import {useStore} from 'vuex'
	import {defineComponent, ref} from 'vue'
	import {customDateFormat} from '@/utils/date-time'

	export default defineComponent({
		name: 'Home',
		components: {CitySearch, WeatherInfo},

		setup() {
			const store = useStore()
			const city = ref('')
			const isTabActive: any = ref({})
			const lastUpdatedTime = ref(customDateFormat(new Date()))

			// Load Pre Defined Cities
			async function loadPreDefinedCitiesData() {
				await store.dispatch('getPreDefinedCitiesData')
				await loadCurrentCityWeatherInfo(store.state.preDefinedCities[0])
			}

			// Load Current City Weather Info
			async function loadCurrentCityWeatherInfo(city: any) {
				for (const i in isTabActive) {
					isTabActive[i] = false
				}
				isTabActive[city.city_id] = true
				await store.dispatch('getCurrentCityWeatherInfo', {lat: city.lat, lon: city.lon})
				lastUpdatedTime.value = customDateFormat(new Date())
			}
			loadPreDefinedCitiesData()

			// On City Select
			const onCitySelect = (city: any) => {
				loadCurrentCityWeatherInfo(city)
				store.dispatch('getCurrentSearchedCity', city)
				for (const i in isTabActive) {
					isTabActive[i] = false
				}
				isTabActive[city.city_id] = true
			}

			return {
				onCitySelect,
				loadCurrentCityWeatherInfo,
				isTabActive,
				lastUpdatedTime,
			}
		},
	})
</script>
<style>
	.loader-section {
		@apply absolute w-full h-full bg-primary-50 flex opacity-70 place-content-center;
	}

	.error-section {
		@apply absolute  w-full h-full bg-neutral-600 flex opacity-100 text-primary-50 place-content-center;
	}

	.tab-section {
		@apply cursor-pointer space-x-6 bg-background uppercase font-semibold;
	}
	.footer {
		@apply flex justify-end text-neutral-50 px-4 pb-4;
	}
</style>
