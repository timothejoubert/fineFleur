<script lang="ts" setup>
</script>
<template>
	<VDialog
		:modal="false"
		:dialog-class="$style.dialog"
	>
		<template #target="{ isOpen, toggle, id }">
			<VButton
				@click="toggle"
				:class="$style.toggle"
				:aria-controls="id"
				:aria-pressed="isOpen"
				:aria-expanded="isOpen"
				:aria-label="$t(isOpen ? 'close_filters' : 'open_filters')"
			>
				<template #icon="{itemClass}">
					<span :class="[itemClass, $style.icon]"></span>
				</template>
			</VButton>
		</template>
		<template #default>
			<VTagFilter :class="$style.filters" />
			<!-- <VOrderFilter :class="$style.filters" /> -->
		</template>
	</VDialog>
</template>
<style lang="scss" module>
.toggle {
	@include media('>=md') {
		--v-button-display: none;
	}
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

.dialog {
	border: none;
	margin: initial;

	@include media('<md') {
		--v-tag-filter-align-items: stretch;

		top: initial;
		right: var(--v-header-inline);
		bottom: 100px;
		left: var(--v-header-inline);
		width: initial;
		padding: 24px;
		border-radius: var(--radius-lg, 16px);
		backdrop-filter: blur(10px);
		background: var(--theme-surface-primary);
		box-shadow: 0 4px 24px 0 rgb(0, 0, 0, 10%);
		opacity: 0;
		transition:
			display 0.5s allow-discrete ease(out-quad),
			overlay 0.5s allow-discrete ease(out-quad),
			translate 0.5s ease(out-quad),
			opacity 0.5s ease(out-quad);
		translate: 0 30px;

		&:open {
			opacity: 1;
			translate: 0 0;
		}

		@starting-style {
			&:open {
				opacity: 0;
				translate: 0 30px;
			}
		}
	}

	@include media('>=md') {
		all: initial;
		color: inherit;
		font-family: inherit;

		&::backdrop {
			display: none;
		}
	}
}
</style>
