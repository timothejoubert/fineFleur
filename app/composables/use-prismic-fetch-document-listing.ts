import type { ExtractDocumentType } from '~/types/api'
import type { AllDocumentTypes } from '~~/prismicio-types'
// import { generateHashFromObject } from '~/utils/hash'

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

	// const hash: string[] = [prismicDocument]
	// if (Object.keys(fetchOptions).length)
	// 	hash.push(generateHashFromObject(fetchOptions))

	// const key = `documents-${hash.join('-')}`

	return useAsyncData(
		() => {
			return prismicClient.getByType(prismicDocument, fetchOptions)
		}
	)
		// {
		// 	dedupe: 'defer', // wait for the first request to finish before making another request
		// 	deep: false,
		// },
	// )
}
