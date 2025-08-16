'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Default to dark theme
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const setThemeMode = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setThemeMode('light')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          theme === 'light'
            ? 'bg-gray-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setThemeMode('dark')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-gray-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        Dark
      </button>
    </div>
  )
}
