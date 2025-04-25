'use client'

import { FC } from 'react'
import { ShoppingList } from './components/ShoppingList'

const Home: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <ShoppingList />
    </div>
  )
}

export default Home
