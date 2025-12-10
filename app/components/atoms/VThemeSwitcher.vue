
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
	<div :class="$style.root">
		<input type="checkbox" id="theme" name="theme" :checked="theme === 'dark'" @change="toggleTheme" />
		<label for="theme">{{ theme }}</label>
	</div>
</template>
<style lang="scss" module>
.root {
	display: flex;
	align-items: center;

	input {
		margin-right: 8px;
	}
}
</style>
