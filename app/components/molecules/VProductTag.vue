<script lang="ts" setup>
// import { getFilledContentRelationshipField, isContentRelationshipField } from '~/utils/prismic/content-relationship-field';
import type { ProductDocumentDataTagsItem, ProductTagDocument } from '~~/prismicio-types'

const props = defineProps<{
	defaultSlotClass?: string
	productTag: ProductTagDocument | ProductDocumentDataTagsItem['product_tag']
}>()

// const filledProductTag = getFilledContentRelationshipField(props.productTag)
// const prismic = usePrismic()
// const field = computed(() => {
// 	if (!props.productTag) return null
// 	return isContentRelationshipField(props.productTag) && getFilledContentRelationshipField(props.productTag)
// })

const theme = useAppTheme()
const colorStyle = computed(() => {
	if(!props.productTag?.data) return

	const themeData = theme.value === 'dark' ?
		props.productTag?.data.dark_theme?.[0]
		: props.productTag?.data.light_theme?.[0]

	return {
		'--theme-tag-background': themeData?.background || '',
		'--theme-tag-content': themeData?.content || '',
		'--theme-tag-border': themeData?.border || '',
	}
})
const label = computed(() => {
	return props.productTag?.data?.name || ''
})
</script>

<template>
	<slot
		:label="label"
		:style="colorStyle"
	>
		<VTag
			:label="label"
			variant="filled"
			:style="colorStyle"
			:class="defaultSlotClass"
		/>
	</slot>
</template>
