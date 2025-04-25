'use client'

import { FC, useState } from 'react'
import { Item } from '@/types/item'

type ShoppingListItemProps = {
  item: Item
  onUpdate: (id: string, updates: Partial<Item>) => Promise<Item | null>
  onDelete: (id: string) => Promise<void>
}

export const ShoppingListItem: FC<ShoppingListItemProps> = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(item.name)
  const [quantity, setQuantity] = useState(item.quantity)

  const handleUpdate = async () => {
    await onUpdate(item._id?.toString() || '', { name, quantity })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await onDelete(item._id?.toString() || '')
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-24 rounded-md border px-3 py-2"
          />
          <button
            onClick={handleUpdate}
            className="flex-shrink-0 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-shrink-0 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="text-lg break-all">{item.name}</span>
        <span className="text-gray-500 whitespace-nowrap">x{item.quantity}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 rounded px-3 py-1 text-blue-500 hover:text-blue-600 sm:flex-none"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="flex-1 rounded px-3 py-1 text-red-500 hover:text-red-600 sm:flex-none"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
