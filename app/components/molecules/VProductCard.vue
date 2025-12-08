<script lang="ts" setup>
import type { ProductDocument } from '~~/prismicio-types'
import { VPrismicLink } from '#components'

const props = defineProps<{
	product: ProductDocument
}>()

const data = computed(() => props.product.data)
const tags = computed(() => props.product.tags || [])
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
		<template v-if="tags && tags.length">
			<TransitionGroup
				:name="$style['tag-animation']"
				tag="div"
				:class="$style.tags"
			>
				<button
					v-for="(tag, i) in tags"
					:key="tag"
					theme="accent"
					tag="div"
					:filled="true"
					:style="{ '--tag-index': tags.length - i }"
					size="xs"
					:class="$style.tag"
				>
					{{ tag }}
				</button>
			</TransitionGroup>
		</template>
		<VPrismicImage
			:field="data.image"
			:media-props="imageProps"
			:class="$style.image"
			:sourceKeys="['Mobile']"
		/>
		<span :class="$style.brand"> {{ data.brand }}</span>
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
	background-color: #F7F7F7;
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

.image {
	grid-area: image;
	grid-column: 1 / -1;
	margin-block: 20px;
}

.brand {
	color: #898989;
	grid-area: brand;
}

.title {
	grid-area: title;
}

.price {
	color: #898989;
	grid-area: price;
	text-align: right;


	&::after {
		content: '€';
	}
}

</style>
