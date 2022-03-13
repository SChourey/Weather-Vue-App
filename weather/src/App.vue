<template>
	<Header></Header>
	<main class="app-wt-center bg-primary-700">
		<router-view v-slot="{Component}">
			<keep-alive include="Home">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</main>
</template>

<script lang="ts">
	import Header from '@/components/Header.vue'
	import {computed, defineComponent} from 'vue'
	import {useRoute} from 'vue-router'

	export default defineComponent({
		components: {
			Header,
		},

		setup() {
			const route = useRoute()

			return {
				route,
			}
		},
	})
</script>
