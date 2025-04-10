'use client'

import { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Shopping List</h1>
        </div>
      </div>
    </header>
  )
}
