<script lang="ts" setup>
const OPTIONS = ['asc', 'desc']
const inputName = 'sort'

function onChange(event: Event) {
	const target = event.target as HTMLInputElement
	orderings.value.price = [target.value]
}

const { orderings } = useProductListingOptions()

</script>
<template>
	<fieldset :class="$style.root">
		<legend class="visually-hidden">{{ $t('sort_by_price') }}</legend>
		<div v-for="sort in OPTIONS" :key="sort">
			<label :for="`sort-${sort}`">{{ sort }}</label>
			<input
				:checked="!!orderings.price?.includes(sort)"
				type="radio"
				:name="inputName"
				:id="`sort-${sort}`"
				:value="sort"
				@change="onChange"
			/>
		</div>
		<div>
			<label :for="`sort-reset`">{{ $t('reset') }}</label>
			<input
				:checked="!orderings.price?.length"
				type="radio"
				:name="inputName"
				:id="`sort-reset`"
				value=""
				@change="onChange"
			/>
		</div>
	</fieldset>
</template>
<style lang="scss" module>
.root {
	display: flex;
	border: none;
}
</style>
