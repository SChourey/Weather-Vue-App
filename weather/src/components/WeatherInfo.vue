<template>
	<div class="card-section">
		<!-- Hourly Forecast -->
		<div class="weather-info app-wt-padding-4 app-wt-margin-2">
			<div class="weather-info-title app-wt-padding-4 app-wt-border-color h3 sm:h4">Next hours</div>
			<div class="weather-infor-content app-wt-padding-4">
				<div class="weather-hourly app-wt-border-color" v-for="item of weatherData?.hourly" :key="item.temp">
					<div>{{ formatTemperature(item?.temp) }}</div>
					<div class="text-primary-500">{{ formatHumidity(item?.humidity) }}</div>
					<div class="app-wt-flex-center weather-icon app-wt-padding-2">
						<img :src="getWeatherIconUrl(item.weather.icon)" />
					</div>
					<div class="text-neutral-500">{{ unixToTime(item?.dt) }}</div>
				</div>
			</div>
		</div>

		<!-- Daily Forecast -->
		<div class="weather-info app-wt-padding-4 app-wt-margin-2">
			<div class="weather-info-title app-wt-padding-4 app-wt-border-color h3 sm:h4">Next 5 days</div>
			<div class="grid grid-rows">
				<div class="weather-daily app-wt-border-color" v-for="item of weatherData?.daily" :key="item.temp">
					<div class="app-wt-flex-center weather-icon app-wt-padding-2">
						<img :src="getWeatherIconUrl(item.weather.icon)" />
					</div>
					<div class="day">
						{{ unixToDate(item?.dt) }}
						<div class="text-neutral-500 first-letter:capitalize">{{ item?.weather.description }}</div>
					</div>
					<div>{{ formatTemperature(item?.temp.max) }}</div>
					<div>{{ formatTemperature(item?.temp.min) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {WeatherInfoInterface} from '@/models/application'
	import {defineComponent, PropType} from 'vue'
	import {formatTemperature, formatHumidity} from '@/utils/weather'
	import {unixToTime, unixToDate} from '@/utils/date-time'
	import {getWeatherIconUrl} from '@/utils/weather'

	export default defineComponent({
		props: {
			weatherData: {
				type: Object as PropType<WeatherInfoInterface>
			},
		},

		setup() {
			return {
				formatTemperature,
				formatHumidity,
				getWeatherIconUrl,
				unixToTime,
				unixToDate,
			}
		},
	})
</script>

<style>
	.weather-info {
		@apply bg-background rounded-sm;
	}

	.weather-info-title {
		@apply border-b;
	}

	.weather-infor-content {
		@apply flex flex-row text-center overflow-x-auto;
	}

	.weather-hourly {
		@apply border-r;
	}

	.weather-daily {
		@apply grid grid-cols-4 text-center border-b items-center;
	}

	.weather-hourly div {
		@apply w-24
	}

	.weather-icon img {
		@apply w-16 shadow-icon-shadow;
	}
</style>
