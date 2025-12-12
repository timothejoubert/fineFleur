
// Need to have the same key value as custom type fields in Prismic
const FILTERS_KEYS = ['tags', 'brand'] as const
type FilterKey = typeof FILTERS_KEYS[number]

type ProductFilter = {
	[key in FilterKey]?: string[]
}
export function useProductFilters() {
	const router = useRouter()
	const route = useRoute()

	const defaultQueries = FILTERS_KEYS.reduce((acc, key) => {
		if (route.query[key]) {
			const value = route.query[key]
			Object.assign(acc, {[key]: Array.isArray(value) ? value.map(v => String(v)) : [String(value)]})
		}
		return acc
	}, {} as ProductFilter)

	const filters = useState<ProductFilter>('product-filters', () => (defaultQueries))

	function updateRouteQuery() {
		const newQuery = { ...route.query }
		FILTERS_KEYS.forEach((key) => {
			if (filters.value[key] && filters.value[key]!.length > 0) {
				newQuery[key] = filters.value[key]
			} else {
				delete newQuery[key]
			}
		})
		router.replace({ query: newQuery })
	}

	watch(filters, updateRouteQuery, { deep: true })

	return { filters }
}
