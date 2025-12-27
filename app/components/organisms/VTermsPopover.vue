<script lang="ts" setup>
import type { TermsDocument } from '~~/prismicio-types';

const isOpen = defineModel({ type: Boolean, default: false })

const { data: document } = await usePrismicFetchDocument<TermsDocument>('terms')
</script>
<template>
	<VDialog
		v-model="isOpen"
		:dialog-class="$style.popover"
		modal
	>
		<template #target="{ isOpen, open, id }">
			<VButton
				:aria-controls="id"
				:aria-expanded="isOpen"
				variant="ghost"
				:aria-label="$t('open.terms')"
				:label="document?.data.section_title || 'fallback'"
				@click="open"
				:class="$style.target"
			/>
		</template>
		<template #default>
			<header :class="$style.header">
				<h2 :class="$style.title">
					{{ document?.data.section_title }}
				</h2>
				<VButton
					@click="() => isOpen = false"
					variant="outlined"
					:aria-label="$t('close.terms')"
					icon="close"
					:label="$t('close')"
					autofocus
				/>
			</header>
			<div :class="$style.body">
				<VText :content="document?.data.content" />
			</div>
		</template>
	</VDialog>
</template>

<style lang="scss" module>

.target {
	display: none;

	@include media('>=md') {
		display: initial;
	}
}

.popover {
	width: min(100%, 696px);
	max-height: 80vh;
	padding: 0 51px 48px;
	border: none;
	border-radius: 16px;
	background-color: var(--theme-surface-primary);
	opacity: 0;
	scrollbar-width: none;
	transition:
		display 0.4s allow-discrete ease(out-quad),
		overlay 0.4s allow-discrete ease(out-quad),
		translate 0.4s ease(out-quad),
		opacity 0.4s ease(out-quad);
	translate: 0 30px;

	&:open {
		opacity: 1;
		translate: 0 0;
	}

	&::backdrop {
		background-color: transparent;
		transition:
			display 0.5s allow-discrete,
			overlay 0.5s allow-discrete,
			background-color 0.5s;
	}

	&:open::backdrop {
		background-color: var(--theme-surface-overlay);
	}

	@starting-style {
		&:open {
			opacity: 0;
			translate: 0 30px;
		}

		&:open::backdrop {
			background-color: transparent;
		}
	}
}

.header {
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 51px;
	padding-bottom: 24px;
	border: solid var(--theme-line-primary);
	border-width: 0 0 1PX;
	background-color: var(--theme-surface-primary);
}

.title {
	margin-block: 0;
}

.body {
	margin-top: 24px;
}
</style>
