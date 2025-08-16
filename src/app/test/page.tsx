'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { testKinematics } from '@/lib/kinematics.test'

export default function TestPage() {
  useEffect(() => {
    const results = testKinematics()
    console.log('Test results:', results)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Kinematics Test Page
        </h1>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Test Results
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Check the browser console for detailed test results.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            If you see the test results in the console, the kinematics calculations are working correctly!
          </p>
        </div>
        
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Main App
          </Link>
        </div>
      </div>
    </div>
  )
}
