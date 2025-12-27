<script lang="ts" setup>
const prismicClient = usePrismic().client

const { data: tags } = useAsyncData('all-repo-tags', () => {
		return prismicClient.getAllByType('product_tag')
	},
	{ deep: false },
)

const { filters } = useProductFilters()

function onChange(event: Event) {
	const input = event.target as HTMLInputElement
	filters.value.product_tag = [input.value]
}

// Reset filter if the selected tag is clicked again
function onClick(id: string) {
	if (filters.value.product_tag?.includes(id)) {
		filters.value.product_tag = []
	}
}

</script>
<template>
	<fieldset :class="$style.root">
		<legend class="visually-hidden">{{ $t('filter_by_tags') }}</legend>
		<template v-for="tag in tags" :key="tag.uid" >
			<VProductTag :product-tag="tag" v-slot="{ label, style }">
				<VTag @click="() => onClick(tag.id)" :class="$style.item" :style="style" variant="outlined">
					<template #icon="{itemClass}">
						<input
							type="radio"
							:checked="filters.product_tag?.includes(tag.id)"
							:id="tag.id"
							name="tags"
							:value="tag.id"
							:class="[$style.input]"
							@change="onChange"
						/>
						<span :class="[$style.circle, itemClass]"></span>
					</template>
					<template #label="{ itemClass }">
						<label :for="tag.id" :class="[$style.label, itemClass]">{{ label }}</label>
					</template>
				</VTag>
			</VProductTag>
		</template>
	</fieldset>
</template>
<style lang="scss" module>
@use 'assets/scss/variables/fonts' as *;

.root {
	display: flex;
	flex-direction: column;
	align-items: var(--v-tag-filter-align-items, flex-start);
	padding: initial;
	border: initial;
	margin: initial;
	gap: 8px;

	&:has( input:focus-visible)::before {
		position: absolute;
		border-radius: 16px;
		background-color: var(--theme-surface-secondary);
		content: '';
		inset: -8px;
	}
}

.item {
	position: relative;
	cursor: pointer;
}

.circle {
	width: 8px;
	height: 8px;
	border: 1PX solid var(--theme-tag-border);
	border-radius: 50vmax;
	transition: background-color 0.3s ease(out-quad);

	@media (hover: hover) {
		.item:hover & {
			background-color: var(--theme-tag-background);
		}
	}

	.item input:checked + & {
		background-color: var(--theme-tag-border);
	}
}

.input {
	all: initial;
	position: absolute;
	cursor: pointer;
	inset: 0;
}

.label {
    font-family: $default-font-family;
}
</style>
