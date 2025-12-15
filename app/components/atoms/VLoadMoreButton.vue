<script setup lang="ts">
import { joinURL } from 'ufo'
import { NuxtLink } from '#components'


const props = defineProps<{
    pending?: boolean
    queryKey: string
}>()

const router = useRouter()
const route = useRoute()
const page = computed(() => {
    const pageQuery = route.query[props.queryKey] as string
    return pageQuery ? parseInt(pageQuery) : 1
})

const to = computed(() => {
    if (props.pending) return

    return {
        path: route.path,
        query: {
            ...route.query,
            [props.queryKey]: page.value + 1,
        },
    }
})

const siteUrl = useRuntimeConfig().public.site.url
const nextHref = computed(() => {
    const path = to.value && router.resolve(to.value)?.href
    if (!path) return

    return joinURL(siteUrl, path)
})

useHead({
    link: [{
        rel: 'next',
        href: nextHref,
    }],
})
</script>

<template>
    <component
        :is="to ? NuxtLink : 'span'"
        :class="$style.root"
        :to="to"
        rel="next"
        :aria-label="$t('load_more.aria_label')"
    >
        {{ $t('load_more') }}
    </component>
</template>

<style module lang="scss">
.root {
    position: relative;
    display: flex;
    width: fit-content;
    flex-wrap: wrap;
    align-items: center;
    color: currentcolor;
    text-decoration: none;

    &:not([href]) {
        color: #ccc;
        cursor: default;
    }
}
</style>
