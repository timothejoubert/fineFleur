
// Need to have the same key value as custom type fields in Prismic
const FILTERS_KEYS = ['product_tag', 'brand'] as const
const ORDERING_KEYS = ['price'] as const
type FilterKey = typeof FILTERS_KEYS[number]
type OrderingKey = typeof ORDERING_KEYS[number]

type ProductFilter = {
	[key in FilterKey]?: string[]
}

type ProductOrdering = {
	[key in OrderingKey]?: string[]
}

export function useProductListingOptions() {
	const router = useRouter()
	const route = useRoute()

	function getQueryParamValues(param: string) {
		const value = route.query[param]
		if (!value) return []

		if (Array.isArray(value)) return value.filter(v => !!v)
		else if (value) return [value]

		return []
	}

	function getDefaultQueries(keys: typeof FILTERS_KEYS | typeof ORDERING_KEYS) {
		return keys.reduce((acc, key) => {
			const value = getQueryParamValues(key)

			if (value.length) {
				Object.assign(acc, {
					[key]: value
				})
			}

			return acc
		}, {} as ProductFilter | ProductOrdering)
	}

	const defaultFilterQueries = getDefaultQueries(FILTERS_KEYS) as ProductFilter
	const defaultOrderingQueries = getDefaultQueries(ORDERING_KEYS) as ProductOrdering

	const filters = useState<ProductFilter>('product-filters', () => (defaultFilterQueries))
	const orderings = useState<ProductOrdering>('product-orderings', () => (defaultOrderingQueries))

	function updateRouteQuery(keys: typeof FILTERS_KEYS | typeof ORDERING_KEYS, data: ProductFilter | ProductOrdering) {
		const newQuery = { ...route.query }
		keys.forEach((key) => {
			const value = data[key]?.filter(v => !!v)
			if (value && value.length > 0) {
				newQuery[key] = value
			} else {
				delete newQuery[key]
			}
		})
		router.replace({ query: newQuery })
	}

	watch(filters, (newFilter) => updateRouteQuery(FILTERS_KEYS, newFilter), { deep: true })
	watch(orderings, (newOrdering) => updateRouteQuery(ORDERING_KEYS, newOrdering), { deep: true })

	return { filters, orderings }
}
