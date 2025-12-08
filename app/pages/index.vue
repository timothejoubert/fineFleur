<script lang="ts" setup>
import type { ProductDocument } from '~~/prismicio-types';
import { PRODUCT_TYPE } from '~~/shared/prismic-documents'

const response = await usePrismicFetchDocuments<ProductDocument>(PRODUCT_TYPE)
const result = computed(() => response.data.value?.results || [])

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
