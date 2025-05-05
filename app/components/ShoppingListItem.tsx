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
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 flex-1 rounded-md border px-3 py-2"
        />
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="rounded border p-2 hover:bg-gray-100"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            {/* Minus SVG icon - CC0 from SVGRepo */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-14 flex-shrink-0 rounded-md border px-2 py-2 text-center"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="rounded border p-2 hover:bg-gray-100"
            onClick={() => setQuantity((q) => q + 1)}
          >
            {/* Plus SVG icon - CC0 from SVGRepo */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div className="flex-grow" />
          <div className="flex flex-grow gap-2">
            <button
              onClick={handleUpdate}
              className="flex-grow rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-grow rounded-md bg-gray-500 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow">
      <div className="flex min-w-0 items-center gap-2">
        <span className="max-w-xs truncate break-all text-lg">{item.name}</span>
        <span className="whitespace-nowrap text-gray-500">x{item.quantity}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded p-2 text-blue-500 transition-colors hover:bg-blue-100"
          aria-label="Edit"
        >
          {/* Pencil SVG icon (edit) - CC0 from SVGRepo */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 2 21l1.5-5L16.5 3.5z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="rounded p-2 text-red-500 transition-colors hover:bg-red-100"
          aria-label="Delete"
        >
          {/* Trash SVG icon (delete) - CC0 from SVGRepo */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  )
}
