<script lang="ts" setup>
const { data: tags } = useAsyncData('all-repo-tags', () => {
		return usePrismic().client.getAllByType('product_tag')
	},
	{ dedupe: 'defer', deep: false},
)

const { filters } = useProductFilters()

function onChange(event: Event) {
	const input = event.target as HTMLInputElement
	filters.value.product_tag = [input.value]
}

</script>
<template>
	<fieldset :class="$style.root">
		<legend class="visually-hidden">Filter by tags</legend>
		<template v-for="tag in tags" :key="tag.uid" >
			<VProductTag :product-tag="tag" v-slot="{ label, style }">
				<VTag :class="$style.item" :style="style" variant="outlined">
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
		<VTag :class="$style.item" variant="outlined" :label="$t('reset')" @click="filters.product_tag = []" />
	</fieldset>
</template>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: initial;
	border: initial;
	margin: initial;
	gap: 8px;
}

.item {
	position: relative;
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
</style>
