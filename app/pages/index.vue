<script lang="ts" setup>
import { listingQueries } from '~/constants/listing-queries';
import type { ProductDocument } from '~~/prismicio-types';
import { PRODUCT_TYPE, SETTINGS_TYPE } from '~~/shared/prismic-documents'

const setting = useNuxtData(getPrismicFetchDocumentKey(SETTINGS_TYPE))
usePrismicHead(setting.data.value)
usePrismicSeoMeta(setting.data.value)

const { filters, orderings } = useProductListingOptions()

const prismic = usePrismic()
const route = useRoute()

const filterOptions = computed(() => {
	return Object.entries(filters.value)
		.filter(([_, value]) => value && value.length)
		.map(([key, value])=> {
			return prismic.filter.any(`my.product.tags.${key}`, value)
		})
})

const orderingOptions = computed(() => {
	const orderingEntries = Object.entries(orderings.value)
		.filter(([_, value]) => value && value.length)

	if(orderingEntries.length) {
		return orderingEntries.map(([field, direction]) => {
			return {
				field: `my.product.${field}`,
				direction: direction,
			}
		})
	}

	return []
})


const fetchOptions = computed(() => {
	const result = {
		pageSize: 30,
	}
	const pageQuery = route.query[listingQueries.PAGE] as string
	const page = parseInt(pageQuery) || 1

	if (page > 1) {
		Object.assign(result, {
			page: page
		})
	}

	if(orderingOptions.value.length) {
		Object.assign(result, {
			orderings: orderingOptions.value
		})
	}

	if(filterOptions.value.length) {
		Object.assign(result, {
			filters: filterOptions.value,
		})
	}

	return result
})

watch(fetchOptions, () => {
	console.log('Fetch options changed:', fetchOptions.value)
}, { deep: true , immediate: true })

const { data, error } = await usePrismicFetchDocuments<ProductDocument>(PRODUCT_TYPE, fetchOptions)
const result = computed(() => data.value?.results || [])
const hasMorePage = computed(() => {
	return data.value?.next_page !== null
})
</script>

<template>
	<main :class="$style.root">
		<template v-if="result?.length">
			<ul :class="$style.list" >
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
			<LazyVLoadMoreButton v-if="hasMorePage" :queryKey="listingQueries.PAGE" />
		</template>
		<pre v-else-if="error">{{ error }}</pre>
		<p v-else>{{ $t('no_products_found') }}</p>
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
