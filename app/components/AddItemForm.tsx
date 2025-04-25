'use client'

import { FC, useState } from 'react'
import { Item } from '@/types/item'

type AddItemFormProps = {
  onCreateItem: (item: Omit<Item, '_id'>) => Promise<Item | null>
}

export const AddItemForm: FC<AddItemFormProps> = ({ onCreateItem }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    await onCreateItem({
      name: name.trim(),
      quantity,
      bought: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    setName('')
    setQuantity(1)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 sm:flex-row">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="w-24 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex-shrink-0 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </form>
  )
}
