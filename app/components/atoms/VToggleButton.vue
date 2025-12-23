<script lang="ts" setup>

const isOpen = defineModel({
	type: Boolean,
	default: false,
})
</script>
<template>
	<VButton
		:aria-pressed="isOpen"
		@click="isOpen = !isOpen"
		:class="$style.root"
		:aria-label="$t(isOpen ? 'close_tag_filter' : 'open_tag_filter')"
	>
		<template #icon="{itemClass}">
			<span :class="[itemClass, $style.icon]"></span>
		</template>
	</VButton>
</template>

<style lang="scss" module>
.root {
	display: inline-flex;
	min-width: 24px;
	min-height: 24px;
	place-items: center center;
}

.icon {
	position: relative;
	display: flex;
	width: 16px;
	height: 16px;
	place-items: center center;

	&::before,
	&::after {
		position: absolute;
		width: 100%;
		height: 1.5px;
		background-color: currentcolor;
		content: '';
		transform-origin: center;
		transition: translate 0.2s ease(out-quad), rotate 0.2s ease(out-quad);
	}

	&::before {
		translate: 0 -2px;
	}

	&::after {
		translate: 0 2px;
	}

	.root[aria-pressed="true"] & {
		&::before {
			rotate: 45deg;
			translate: 0;
		}

		&::after {
			rotate: -45deg;
			translate: 0;
		}
	}
}
</style>
