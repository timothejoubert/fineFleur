import type { ExtractDocumentType } from '~/types/api'
import { generateHashFromObject } from '~/utils/hash'
import type { AllDocumentTypes } from '~~/prismicio-types'

type PrismicClient = ReturnType<typeof usePrismic>['client']
export type GetAllByTypeParams = Parameters<PrismicClient['getAllByType']>[1]

export function usePrismicFetchDocuments<
	T extends AllDocumentTypes,
>(prismicDocument: ExtractDocumentType<T>, options: GetAllByTypeParams = {}) {
	const prismicClient = usePrismic().client
	const fetchOptions = {
		// pageSize: options.pageSize || 12, // default 20
		limit: options.pageSize || 20, // default 20
		// routes: prismicDocumentRoutes,
		brokenRoute: '/404',
		...useLocale()?.fetchLocaleOption.value,
		...options,
	}

	const hash: string[] = [prismicDocument]
	if (Object.keys(fetchOptions).length)
		hash.push(generateHashFromObject(fetchOptions))

	const key = `documents-${hash.join('-')}`

	return useAsyncData(
		key,
		() => {
			return prismicClient.getByType(prismicDocument, options)
		},
		{
			dedupe: 'defer', // wait for the first request to finish before making another request
			deep: false,
		},
	)
}
