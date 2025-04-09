'use client'

import { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Shopping List</h1>
        </div>
      </div>
    </header>
  )
} 