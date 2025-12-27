
<script lang="ts" setup>
const theme = useAppTheme()

useHead(() => ({
	htmlAttrs: {
		'data-color-scheme': theme.value,
	},
	meta: [
		{
			name: 'color-scheme',
			content: 'light dark',
		},
	],
}))

function onPreferredThemeChange(event: MediaQueryListEvent) {
	theme.value = event.matches ? 'dark' : 'light'
}

const getIsDarkMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

onMounted(() => {
	getIsDarkMediaQuery().addEventListener('change', onPreferredThemeChange)
})

onBeforeUnmount(() => {
	getIsDarkMediaQuery().removeEventListener('change', onPreferredThemeChange)
})

function toggleTheme() {
	theme.value = theme.value === 'light' ? 'dark' : 'light'
}

watch(theme, (newTheme) => {
	document.documentElement.style.colorScheme = newTheme
})
</script>
<template>
	<VButton
		@click="toggleTheme"
		:label="$t(`color_scheme.${theme}`)"
		icon="theme-3"
		variant="ghost"
		:aria-label="$t('switch_color_scheme')"
	/>
</template>
