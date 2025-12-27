type WindowSize = number | null
export function useWindowSize() {
	const isInitialized = useState<boolean>('windowSizeInitialized', () => false)
	const width = useState<WindowSize>('windowWidth', () => null)
	const height = useState<WindowSize>('windowHeight', () => null)

	function updateSize() {
		width.value = window.innerWidth
		height.value = window.innerHeight
	}

	onMounted(() => {
		if(isInitialized.value) {
			return
		}

		updateSize()
		window.addEventListener('resize', updateSize)
		isInitialized.value = true
	})

	onUnmounted(() => {
		window.removeEventListener('resize', updateSize)
	})

	return { width, height }
}
