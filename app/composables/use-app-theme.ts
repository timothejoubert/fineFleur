export type Theme = 'light' | 'dark'

export function useAppTheme() {
	return useState<Theme>('app-theme', () => 'light')
}
