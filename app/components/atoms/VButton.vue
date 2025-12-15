<script lang="ts" setup>

type Props = {
	tag?: string
	label?: string
	icon?: string
	variant?: 'filled' | 'outlined' | 'ghost'
	size?: 'md'
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
	<component :is="tag || 'button'" :class="rootClasses">
		<slot name="label" :item-class="$style.label">
			<span :class="$style.label">
				{{ label }}
			</span>
		</slot>
		<slot name="icon" :item-class="$style.icon">
			<VIcon v-if="icon" :name="icon" :class="$style.icon" />
		</slot>
	</component>
</template>

<style lang="scss" module>
.root {
	display: inline-flex;
	align-items: center;
	padding: 4px 8px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition:
		color 0.3s ease(out-quad),
		background-color 0.3s ease(out-quad),
		border-color 0.3s ease(out-quad);

	&--variant-filled {
		padding: 4px 6px;
		border-radius: 8px;
		background-color: var(--theme-button-background);
	}

	&--variant-outlined {
		border: 1PX solid var(--theme-button-medium-border);
		border-radius: 8px;
		background-color: transparent;
		color: var(--theme-button-medium-content);

		&:active {
			border-color: var(--theme-button-medium-border-pressed);
		}

		@media(hover: 'hover') {
			&:hover {
				border-color: var(--theme-button-medium-border-hover);
			}
		}
	}

	&--variant-ghost {
		background-color: var(--theme-button-low-bg);
		color: var(--theme-button-low-content);

		&:active {
			background-color: var(--theme-button-low-bg-pressed);
			color: var(--theme-button-low-content-pressed);
		}

		@media(hover: 'hover') {
			&:hover {
				background-color: var(--theme-button-low-bg-hover);
				color: var(--theme-button-low-content-hover);
			}
		}
	}
}

.label {
	font-size: 14px;
	font-weight: 400;
	letter-spacing: -0.28px;
	line-height: 1.7;
	padding-inline: 4px;
}

.icon {
	flex-shrink: 0;
	margin-inline: 4px;
}
</style>
