import type { ExtractDocumentType } from '~/types/api'
import type { AllDocumentTypes } from '~~/prismicio-types'
// import { generateHashFromObject } from '~/utils/hash'

type PrismicClient = ReturnType<typeof usePrismic>['client']
export type GetAllByTypeParams = Parameters<PrismicClient['getAllByType']>[1]

export function usePrismicFetchDocuments<
	T extends AllDocumentTypes,
>(prismicDocument: ExtractDocumentType<T>, options: MaybeRefOrGetter<GetAllByTypeParams>) {

	const prismicClient = usePrismic().client
	const fetchOptions = computed(() => {
		return {
			// routes: prismicDocumentRoutes,
			pageSize:  toValue(options)?.pageSize || 1, // default 20
			brokenRoute: '/404',
			...useLocale()?.fetchLocaleOption.value,
			...(toValue(options) || {}),
		}
	})

	const key = computed(() => {
		const optionsHash = generateHashFromObject(fetchOptions.value)
		return`listing-${prismicDocument}-${optionsHash}`
	})

	return useAsyncData(
		key,
		() => {
			return prismicClient.getByType(prismicDocument, fetchOptions.value)
		}, {
			dedupe: 'cancel' // cancels existing requests when a new one is made
		}
	)
}
