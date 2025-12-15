<script lang="ts" setup>
import type { TermsDocument } from '~~/prismicio-types';

const id = useId()

const popoverElement = useTemplateRef<HTMLDialogElement>('popover')

const { data: document } = await usePrismicFetchDocument<TermsDocument>('terms')

function openPopover() {
	popoverElement.value?.showModal()
}
</script>
<template>
	<VButton
		:popovertarget="id"
		variant="ghost"
		:aria-label="$t('open.terms')"
		:label="document?.data.section_title || 'fallback'"
		@click="openPopover"
	/>
	<dialog
		:id="id"
		:class="$style.popover"
		ref="popover"
		closedby="any"
	>
		<header :class="$style.header">
			<h2 :class="$style.title">
				{{ document?.data.section_title }}
			</h2>
			<VButton
				@click="popoverElement?.close()"
				variant="outlined"
				:aria-label="$t('close.terms')"
				icon="close"
				:label="$t('close')"
				autofocus
			/>
		</header>
		<hr :class="$style.separator">
		<div :class="$style.body">
			<VText :content="document?.data.content" />
		</div>
	</dialog>
</template>
<!-- <style>
html {
	scrollbar-gutter: stable;
}

body:has(dialog:modal) {
  overflow: hidden;
}
</style> -->

<style lang="scss" module>
.popover {
	width: min(100%, 696px);
	padding: 48px 51px;
	border: none;
	border-radius: 16px;
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
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.title {
	margin-block: 0;
}

.separator {
	border-width: 1PX 0 0;
	border-color: var(--theme-line-primary);
	margin-block: 24px;
}

.body {
	overflow: auto;
	max-height: 60vh;
}
</style>
