<script lang="ts" setup>
import type { ProductDocument } from '~~/prismicio-types';
import { PRODUCT_TYPE } from '~~/shared/prismic-documents'

const { filters } = useProductFilters()

const prismic = usePrismic()

const filterOptions = computed(() => {
	const entries = Object.entries(filters.value).filter(([_, value]) => value && value.length)

	const filtersOptions = entries.map(([key, value])=> {
		return prismic.filter.at(`my.product.${key}`, value)
	})

	// if (filtersOptions.length) {
	// 	return {
	// 		filters: filtersOptions
	// 	}
	// }

	return undefined
})

watch(filterOptions, () => {
	refresh()
	console.log(filterOptions.value)
}, { deep: true})

console.log('filterOptions', filterOptions.value)
const { data, refresh, error } = await usePrismicFetchDocuments<ProductDocument>(PRODUCT_TYPE, filterOptions.value)
const result = computed(() => data.value?.results || [])


// const hasMorePage = computed(() => {
// 	return response.data.value?.next_page !== null
// })
</script>

<template>
	<main :class="$style.root">
		<ul :class="$style.list" v-if="result?.length">
			<li
				:class="[$style.item, product.data?.extended && $style['item--extended']]"
				v-for="product in result"
				:key="product?.id"
			>
				<VProductCard
					:product="product"
				/>
			</li>
		</ul>
		<pre v-else-if="error">{{ error }}</pre>
		<p v-else>No products found</p>
	</main>
</template>

<style lang="scss" module>
.root {
	padding-block: var(--app-padding-block);
}

.list {
	display: grid;
	padding: 0;
	margin: 0;
	gap: var(--gutter);
	grid-auto-flow: dense;
	grid-template-columns: 1fr;
	list-style: none;

	@media (width > 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
}

.item {
	grid-column: span 1;

	@media (width > 768px) {
		&--extended {
			grid-column: span 2;
		}
	}
}
</style>
