
<script lang="ts" setup>
const theme = ref('light')

function toggleTheme() {
	theme.value = theme.value === 'light' ? 'dark' : 'light'
	document.documentElement.setAttribute('data-theme', theme.value)
}
</script>
<template>
	<div :class="$style.root">
		<input type="checkbox" id="theme" name="theme" :checked="theme === 'dark'" @change="toggleTheme" />
		<label for="theme">{{ theme === 'dark' ? 'Dark' : 'Light' }}</label>
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
