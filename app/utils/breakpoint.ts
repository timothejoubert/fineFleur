import { breakpoints } from '~/constants/breakpoints'

export function getBreakpoint(breakpoint: keyof typeof breakpoints): number {
	return breakpoints[breakpoint]
}
