// Theme utility functions - centralized for consistency and reusability

export interface ThemeClasses {
  cardBg: string
  dropdownBg: string
  text: string
  secondaryText: string
  inputBg: string
  borderColor: string
}

export function getThemeClasses(mode: string, color: string): ThemeClasses {
  const isDark = mode === "dark" || color === "black"
  
  return {
    cardBg: isDark ? "bg-gray-900/40" : "bg-white/40",
    dropdownBg: isDark ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-300",
    text: isDark ? "text-white" : "text-gray-900",
    secondaryText: isDark ? "text-gray-300" : "text-gray-600",
    inputBg: isDark ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-white/50",
    borderColor: isDark ? "border-gray-600" : "border-gray-300"
  }
}