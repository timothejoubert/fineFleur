<script lang="ts" setup>
</script>

<template>
	<div :class="$style.root" class="grid">
		<DevOnly>
			<VGridVisualizer />
		</DevOnly>
		<NuxtRouteAnnouncer />

		<VHeader :class="$style.header" />
		<NuxtPage :class="$style.page" />
	</div>
</template>

<style lang="scss" module>
.root {
	--app-padding-block: 16px;

	min-height: 100vh;
}

.header {
	grid-column: 1 / -1;

	@media (width >= 768px) {
		grid-column: 1 / span 2;
	}
}

.page {
	grid-column: 1 / -1;

	@media (width >= 768px) {
		grid-column: 3 / -1;
	}
}
</style>
