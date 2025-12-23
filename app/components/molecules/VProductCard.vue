<script lang="ts" setup>
import type { ProductDocument } from '~~/prismicio-types'
import { VPrismicLink } from '#components'

const props = defineProps<{
	product: ProductDocument
}>()

const data = computed(() => props.product.data)
const tagDocuments = computed(() => {
	return data.value.tags.map(tagDocument => {
		return tagDocument.product_tag
	}).filter(t => !!t)
})
const url = computed(() => data.value.link)

const imageProps = computed(() => {
	const props = {
		sizes: 'xs:85vw sm:85vw md:85vw lg:40vw xl:40vw hq:40vw qhd:40vw',
		modifiers: {
			fit: 'crop',
		}
	}

	if (data.value.extended) {
		return {
			...props,
			sizes: 'xs:85vw sm:85vw md:85vw lg:80vw xl:80vw hq:80vw qhd:80vw',
			width: data.value.image.Extended.dimensions?.width,
			height: data.value.image.Extended.dimensions?.height,

		}
	}

	return props
})
</script>

<template>
	<div
		:class="$style.root"
	>
		<div v-if="tagDocuments.length" :class="$style.tags">
			<template v-for="tag in tagDocuments" :key="tag?.id || tag?.uid">
				<VProductTag :product-tag="tag" :default-slot-class="$style.tag" />
			</template>

		</div>
		<VPrismicImage
			:field="data.image"
			:media-props="imageProps"
			:class="$style.image"
			:sourceKeys="['Mobile']"
		/>
		<span :class="$style.brand">{{ data.brand }}</span>
		<component
			:is="url ? VPrismicLink : 'h3'"
			v-if="data.name"
			:to="url"
			:class="[$style.title]"
		>
			{{ data.name }}
		</component>
		<span :class="$style.price"> {{ data.price }}</span>
	</div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    display: grid;
	padding: 20px;
	border-radius: 16px;
	background-color: var(--theme-surface-secondary);
	column-gap: var(--gutter);
	grid-template-areas:
		"tags tags"
		"image image"
		"brand ."
		"title price";
	grid-template-columns: repeat(2 , minmax(0, 1fr));
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
	grid-area: tags;
}

.tag {
	position: relative;
	z-index: 2; // behind pseudo element link
}

.image {
	grid-area: image;
	grid-column: 1 / -1;
	margin-block: 20px;
}

.brand {
	color: var(--theme-content-secondary);
	grid-area: brand;
}

.title {
	color: var(--theme-content-primary);
	grid-area: title;
	text-decoration: none;

	&::before {
		position: absolute;
		content: '';
		cursor: pointer;
		inset: 0;
	}
}

.price {
	color: var(--theme-content-secondary);
	grid-area: price;
	text-align: right;

	&::after {
		content: '€';
	}
}

</style>
