<script lang="ts" setup>
import type { TermsDocument } from '~~/prismicio-types';

const id = useId()

const isOpen = defineModel({ type: Boolean, default: false })

const popoverElement = useTemplateRef<HTMLDialogElement>('popover')

const { data: document } = await usePrismicFetchDocument<TermsDocument>('terms')

watch(isOpen, (newValue) => {
	if(!popoverElement.value) return
	console.log('watch isOpen', newValue)

	if (newValue) {
		popoverElement.value?.showModal()
	} else {
		popoverElement.value?.close()
	}
})

function onDialogClose() {
	isOpen.value = false
}

onMounted(() => {
	if(!popoverElement.value) return
	popoverElement.value.addEventListener('close', onDialogClose)
})

onBeforeUnmount(() => {
	if(!popoverElement.value) return
	popoverElement.value.removeEventListener('close', onDialogClose)
})

</script>
<template>
	<VButton
		:popovertarget="id"
		variant="ghost"
		:aria-label="$t('open.terms')"
		:label="document?.data.section_title || 'fallback'"
		@click="() => isOpen = true"
		:class="$style.target"
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
		<div :class="$style.body">
			<VText :content="document?.data.content" />
		</div>
	</dialog>
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
