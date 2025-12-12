<script lang="ts" setup>
import type { SettingsDocument } from '~~/prismicio-types'
import { SETTINGS_TYPE } from '~~/shared/prismic-documents'

const { data } = await usePrismicFetchDocument<SettingsDocument>(SETTINGS_TYPE)
const siteName = computed(() => data.value?.data.site_name)
</script>

<template>
	<header :class="$style.root">
		<h1 :class="$style.title">{{ siteName }}</h1>
		<VTagFilter />
		<div :class="$style.footer">
			<VThemeSwitcher />
			<VTermsPopover />
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
	height: 56px;
	align-items: center;
	padding: 16px;
	border-radius: 16px;
	backdrop-filter: blur(20px);
	background: linear-gradient(0deg, rgb(255, 255, 255, 65%), rgb(255, 255, 255, 65%)),
		linear-gradient(90deg, rgb(255, 255, 255, 10%) 0%, rgb(255, 255, 255, 10%) 100%);
	box-shadow: 0 4px 24px 0 #0000001A;
	gap: 8px;

	@media (width >= 768px) {
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
	font-size: 24px;
	margin-block: 8px;
	text-align: center;

	@media (width < 768px) {
		flex-grow: 1;
	}
}

.footer {
	display: flex;
	margin-top: auto;
	gap: 2px;

	@media (width < 768px) {
		order: -1;
	}
}
</style>
