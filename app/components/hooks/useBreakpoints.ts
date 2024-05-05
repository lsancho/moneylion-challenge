import { createBreakpoint } from 'react-use'
import defaultTheme from 'tailwindcss/defaultTheme'

const screens = defaultTheme.screens

export type Breakpoint = keyof typeof breakpoints
export const breakpoints = {
  sm: parseInt(screens.sm),
  md: parseInt(screens.md),
  lg: parseInt(screens.lg),
  xl: parseInt(screens.xl),
  '2xl': parseInt(screens['2xl'])
}

console.log({ screens })

const useBreakpoint = createBreakpoint(breakpoints) as () => Breakpoint
export default useBreakpoint
