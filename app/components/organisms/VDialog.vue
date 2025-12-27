<script lang="ts" setup>

const props = defineProps<{
	popoverId?: string
	targetProps?: Record<string, unknown>
	modal?: boolean
	dialogClass?: string
	dialogTag?: string
}>()

const id = props.popoverId || useId()
const isOpen = defineModel({ type: Boolean, default: false })
const popoverElement = useTemplateRef<HTMLDialogElement>('popover')

watch(isOpen, (newValue) => {
	if(!(popoverElement.value instanceof HTMLDialogElement)) return

	if (newValue) {
		const method = props.modal ? 'showModal' : 'show'
		popoverElement.value[method]()
	} else {
		popoverElement.value.close()
	}
})

const toggle = () => {
	isOpen.value = !isOpen.value
}

const open = () => {
	isOpen.value = true
}
const close = () => {
	isOpen.value = false
}

onMounted(() => {
	if(!popoverElement.value) return
	popoverElement.value.addEventListener('close', close)
})

onBeforeUnmount(() => {
	if(!popoverElement.value) return
	popoverElement.value.removeEventListener('close', close)
})

</script>
<template>
	<slot
		name="target"
		:is-open="isOpen"
		:open="open"
		:close="close"
		:toggle="toggle"
		:id="id"
	>
		<VButton
			:aria-pressed="isOpen"
			:aria-controls="id"
			@click="open"
			:aria-label="$t(isOpen ? 'open' : 'close')"
			v-bind="targetProps"
		/>
	</slot>
	<component
		:is="dialogTag || 'dialog'"
		:id="id"
		ref="popover"
		closedby="any"
		:class="dialogClass"
	>
		<slot />
	</component>
</template>
