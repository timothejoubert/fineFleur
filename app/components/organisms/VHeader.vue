<script lang="ts" setup>
import type { SettingsDocument } from '~~/prismicio-types'
import { SETTINGS_TYPE } from '~~/shared/prismic-documents'

const { data } = await usePrismicFetchDocument<SettingsDocument>(SETTINGS_TYPE)
const condig = useRuntimeConfig()
const siteName = computed(() => data.value?.data.site_name || condig.public.site.name)

const isTermsOpen = ref(false)
function onTitleClicked() {
	if (window.innerWidth >= 768) return
	isTermsOpen.value = !isTermsOpen.value
}
</script>

<template>
	<header :class="$style.root">
		<h1 :class="$style.title" class="text-h1" @click="onTitleClicked">{{ siteName }}</h1>
		<VListingFilters />
		<div :class="$style.footer">
			<VThemeSwitcher :class="$style['theme-button']" />
			<VTermsPopover v-model="isTermsOpen" />
		</div>
	</header>
</template>

<style lang="scss" module>
.root {
	--v-header-inline: 28px;

	position: fixed;
	z-index: 11;
	right: var(--v-header-inline);
	bottom: 16px;
	left: var(--v-header-inline);
	display: flex;
	min-height: 56px;
	align-items: center;
	padding: 16px;
	border-radius: 16px;
	backdrop-filter: blur(20px);
	background: var(--theme-surface-primary);
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
		text-align: left;
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
