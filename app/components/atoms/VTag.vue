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
		<VIcon v-if="icon" :name="icon" />
		<span :class="$style.label">
			{{ label }}
		</span>
	</component>
</template>

<style lang="scss" module>
.root {
	color: var(--theme-tag-content);
	font-size: 14px;
	font-weight: 400;
	letter-spacing: -0.28px;
	line-height: 170%;

	&--variant-filled {
		padding: 4px 6px;
		border-radius: 8px;
		background-color: var(--theme-tag-background);
	}

	&--variant-outlined {
		padding: 4px 8px;
		border: 1PX solid var(--theme-tag-border);
		border-radius: 8px;
	}
}

.label {
	.root--variant-filled & {
		padding-inline: 4px;
	}

	.root--variant-outlined & {
		padding-inline: 2px;
	}
}
</style>
