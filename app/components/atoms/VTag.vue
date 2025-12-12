<script lang="ts" setup>

type Props = {
	tag?: string
	label?: string
	icon?: string
	variant?: 'filled' | 'outlined'
	size?: 'sm' | 'md' | 'lg'
}
const props = defineProps<Props>()
const $style = useCssModule()
const rootClasses = computed(() => {
	return [
		$style.root,
		props.variant &&$style[`root--variant-${props.variant}`],
		props.size &&$style[`root--size-${props.size}`],
	]
})
</script>
<template>
	<component :is="tag || 'span'" :class="rootClasses">
		<slot name="icon" :item-class="$style.icon">
			<VIcon v-if="icon" :name="icon" :class="$style.icon" />
		</slot>
		<slot name="label" :item-class="$style.label">
			<span :class="$style.label">
				{{ label }}
			</span>
		</slot>
	</component>
</template>

<style lang="scss" module>
.root {
	display: inline-flex;
	align-items: center;
	color: var(--theme-tag-content);

	&--variant-filled {
		padding: 4px 6px;
		border-radius: 8px;
		background-color: var(--theme-tag-background);
	}

	&--variant-outlined {
		border: 1PX solid var(--theme-tag-border);
		border-radius: 8px;

		&:has(.icon) {
			padding: 4px 8px 4px 4px;
		}
	}
}

.label {
	font-size: 14px;
	font-weight: 400;
	letter-spacing: -0.28px;
	line-height: 170%;

	.root--variant-filled & {
		padding-inline: 4px;
	}

	.root--variant-outlined & {
		padding-inline: 2px;
	}
}

.icon {
	flex-shrink: 0;
	margin-inline: 4px;
}
</style>
