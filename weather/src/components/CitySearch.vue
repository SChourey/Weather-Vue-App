<template>
	<!-- Search Input Form -->
	<form class="search-form">
		<div class="search-section">
			<!-- City Search Input -->
			<input class="search-input" type="text" id="searchbox" :placeholder="placeholderText" v-model.trim="searchTerm" autocomplete="off" />

			<!-- City Search Results -->
			<ul class="city-search-results" v-show="isOpen">
				<li class="city-search-result" v-for="item of $store.state.searchCityResults" :key="item.city_id" @click="selectCity(item)">{{ item.city_name }}, {{ item.country_full }}</li>
			</ul>
		</div>
	</form>
</template>

<script lang="ts">
	import {defineComponent, ref} from 'vue'
	import {useStore} from 'vuex'
	import _ from 'lodash'

	export default defineComponent({
		name: 'CitySearch',

		props: {
			placeholderText: String,
		},

		watch: {
			searchTerm(newValue: string) {
				this.citySearch(newValue)
			},
		},

		emits: {
			onCitySelect: (payload: string) => payload.length > 0,
		},

		setup(props, {emit}) {
			const store = useStore()
			const searchTerm = ref('')
			const isOpen = ref(false)
			const searchClickTrigger = ref(false)

			// Search City
			const citySearch = _.debounce(async (searchedValue: string) => {
				if (searchedValue) {
					isOpen.value = true
					await store.dispatch('getSearchCityResults', searchedValue)
				} else {
					isOpen.value = false
				}
			}, 500)

			// Select City
			const selectCity = async (city: any) => {
				emit('onCitySelect', city)
				clear()
				isOpen.value = false
				searchClickTrigger.value = false
			}

			// Clear Search Input
			const clear = () => (searchTerm.value = '')

			return {
				citySearch,
				searchTerm,
				selectCity,
				isOpen,
				clear,
			}
		},
	})
</script>
<style>
	.search-form {
		@apply items-center justify-center absolute top-0 w-full;
	}

	.search-input {
		@apply xl:w-96 lg:w-96 md:w-56 sm:w-40 max-w-full xl:p-4 lg:p-4 md:p-3 sm:p-3
		 bg-secondary-100 rounded-sm autocomplete focus-visible:outline-none h-5 -m-1 mx-0 md:text-sm sm:text-xs;
	}

	.search-section {
		@apply relative w-full grid justify-center sm:justify-end;
	}

	.autocomplete {
		@apply relative;
	}

	.city-search-results {
		@apply relative md:text-xs sm:text-xs h-auto max-h-44 bg-secondary-100 overflow-auto border
		 border-neutral-200 rounded-b-sm xl:w-96 lg:w-96 md:w-56 sm:w-40 max-w-full;
	}

	.city-search-results li {
		@apply px-4 py-2 cursor-pointer;
	}

	.city-search-results li:hover {
		@apply bg-primary-400 text-secondary-50;
	}
</style>
