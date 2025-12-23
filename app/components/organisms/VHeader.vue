<script lang="ts" setup>
import type { SettingsDocument } from '~~/prismicio-types'
import { SETTINGS_TYPE } from '~~/shared/prismic-documents'

const { data } = await usePrismicFetchDocument<SettingsDocument>(SETTINGS_TYPE)
const siteName = computed(() => data.value?.data.site_name)

const isTagsOpen = ref(false)
const tagPopoverId = useId()

const isTermsOpen = ref(false)
function onTitleClicked() {
	if(window.innerWidth >= 768) return
	isTermsOpen.value = !isTermsOpen.value
}
</script>

<template>
	<header :class="$style.root">
		<h1 :class="$style.title" @click="onTitleClicked">{{ siteName }}</h1>
		<VTagFilter
			:class="[$style.filters, isTagsOpen && $style['filters--visible']]"
			:id="tagPopoverId"
		/>
		<VToggleButton
			v-model="isTagsOpen"
			:class="$style.toggle"
			:aria-controls="tagPopoverId"
			:aria-expanded="isTagsOpen"
		/>
		<div :class="$style.footer">
			<VThemeSwitcher :class="$style['theme-button']" />
			<VTermsPopover v-model="isTermsOpen" />
		</div>
	</header>
</template>

<style lang="scss" module>
.root {
	position: fixed;
	z-index: 11;
	right: 28px;
	bottom: 16px;
	left: 28px;
	display: flex;
	min-height: 56px;
	align-items: center;
	padding: 16px;
	border-radius: 16px;
	backdrop-filter: blur(20px);
	background: var(--theme-surface-primary);

	// background: linear-gradient(0deg, rgb(255, 255, 255, 65%), rgb(255, 255, 255, 65%)),
	// 	linear-gradient(90deg, rgb(255, 255, 255, 10%) 0%, rgb(255, 255, 255, 10%) 100%);
	box-shadow: 0 4px 24px 0 #0000001A;
	gap: 8px;

	@include media('>=md') {
		position: sticky;
		top: 0;
		right: initial;
		left: initial;
		display: inline-flex;
		height: 100vh;
		flex-direction: column;
		align-items: flex-start;
		background: initial;
		box-shadow: initial;
		padding-inline: initial;
	}
}

.title {
	flex: 1;
	font-size: 24px;
	margin-block: 0;
	text-align: center;

	@include media('>=md') {
		flex: initial;
		margin-block: 8px;
	}
}

.filters {
	@include media('<md') {
		--v-tag-filter-position: absolute;

		right: 0;
		bottom: 80px;
		left: 0;

		// display: none;
		padding: 24px;
		border-radius: var(--radius-lg, 16px);
		backdrop-filter: blur(10px);
		background: var(--theme-surface-primary);
		box-shadow: 0 4px 24px 0 rgb(0, 0, 0, 10%);
		opacity: 0;
		pointer-events: none;
		transition:
			display 0.5s allow-discrete ease(out-quad),
			overlay 0.5s allow-discrete ease(out-quad),
			translate 0.5s ease(out-quad),
			opacity 0.5s ease(out-quad);
		translate: 0 30px;

		&--visible {
			// display: flex;
			opacity: 1;
			pointer-events: initial;
			translate: 0 0;
		}


		@starting-style {
			&:open {
				// display: none;
				opacity: 0;
				pointer-events: none;
				translate: 0 30px;
			}
		}
	}

	@include media('>=md') {
		align-items: flex-start;
	}
}

.toggle {
	@include media('>=md') {
		display: none;
	}
}

.footer {
	display: flex;
	order: -1;
	gap: 2px;

	@include media('>=md') {
		order: initial;
		margin-top: auto;
	}
}

.theme-button {
	@include media('<md') {
		:global(.v-button__label) {
			display: none;
		}
	}
}
</style>
