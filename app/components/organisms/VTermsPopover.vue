<script lang="ts" setup>
import type { TermsDocument } from '~~/prismicio-types';

const id = useId()

const popoverElement = useTemplateRef<HTMLElement>('popover')

const { data: document } = await usePrismicFetchDocument<TermsDocument>('terms')
</script>
<template>
	<button :popovertarget="id" :class="$style.target">{{ document?.data.section_title }}</button>
	<section :id="id" popover :class="$style.popover" ref="popover">
		<header :class="$style.header">
			<h2 :class="$style.title">
				{{ document?.data.section_title }}
			</h2>
			<button @click="popoverElement?.hidePopover()">Close X</button>
		</header>
		<hr :class="$style.separator">
		<div :class="$style.body">
			<VText :content="document?.data.content" />
		</div>
	</section>
</template>
<style lang="scss" module>
.target {}

.popover {
	width: min(100%, 696px);
	flex-direction: column;
	padding: 48px 51px;
	border: none;
	border-radius: 16px;
	margin-top: 72px;

	&[open] {
		display: flex;
	}

	&::backdrop {
		background-color: var(--theme-surface-overlay);
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
</style>
