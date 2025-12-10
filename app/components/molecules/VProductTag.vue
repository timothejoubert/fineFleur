<script lang="ts" setup>
import { getFilledContentRelationshipField, isContentRelationshipField } from '~/utils/prismic/content-relationship-field';
import type { ProductDocumentDataTagsItem, ProductTagDocument } from '~~/prismicio-types'

const props = defineProps<{
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
	const themeData = theme.value === 'dark' ?
		props.productTag?.data.dark_theme[0]
		: props.productTag?.data.light_theme[0]

	return {
		'--theme-tag-background': themeData?.background || '',
		'--theme-tag-content': themeData?.content || '',
		'--theme-tag-border': themeData?.border || '',
	}
})
</script>

<template>
	<slot
		:id="productTag?.uid || productTag?.id"
		:name="productTag?.data.name || ''"
		test="zfeinfjz"
		:style="colorStyle"
	>
		<VTag
			:label="productTag?.data.name || ''"
			variant="filled"
			:style="colorStyle"
		/>
	</slot>
</template>
