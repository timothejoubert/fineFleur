import { usePrismicPreviewRoute } from '~/composables/use-prismic-preview-route'
import type { PrismicDocumentType } from '~/types/api'
import { isDynamicRoute } from '~~/shared/prismic-routes'
import type { AllDocumentTypes } from '~~/prismicio-types'

export function getPrismicFetchDocumentKey(
	documentType: PrismicDocumentType | undefined,
	uid?: string | undefined,
	documentId?: string | undefined,
) {
	return `page-${documentType}-${uid || documentId || 'single-document'}`
}

export async function usePrismicFetchDocument<T extends AllDocumentTypes>(
	documentType: PrismicDocumentType | undefined,
) {
	const route = useRoute()
	const routeUid = route.params?.uid || ''
	const uid = Array.isArray(routeUid) ? routeUid.at(-1) : routeUid // get the last uid when route has subPage

	const { documentId, isPreview } = usePrismicPreviewRoute()

	const dataKey = getPrismicFetchDocumentKey(documentType, uid, documentId.value)

	const prismicClient = usePrismic().client
	const { fetchLocaleOption } = useLocale()

	const prismicFetchOptions = {
		...fetchLocaleOption.value,
		brokenRoute: '/404',
	}

	return useAsyncData(
		dataKey,
		async () => {
			try {
				if (isPreview.value && documentId.value) {
					return prismicClient.getByID<T>(
						documentId.value,
						prismicFetchOptions,
					)
				}
				else if (
					uid
					&& documentType
					&& isDynamicRoute(documentType)
				) {
					return prismicClient.getByUID<T>(
						documentType,
						uid,
						prismicFetchOptions,
					)
				}
				else if (documentType) {
					return prismicClient.getSingle<T>(
						documentType,
						prismicFetchOptions,
					)
				}
				return undefined
			}
			catch (error) {
				console.error('Error during Prismic document fetch', error)
				return undefined
			}
		},
		{
			deep: false,
		},
	)
}
