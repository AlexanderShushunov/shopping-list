'use client'

import { Item } from '@/types/item'
import { useItemsApi } from '@/services/itemsApi'
import ShoppingListItem from './ShoppingListItem'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

type MessageProps = {
  children: React.ReactNode;
  className?: string;
}

const Message = ({ children, className = 'text-gray-500' }: MessageProps) => (
  <div className="flex justify-center items-center h-32">
    <div className={className}>{children}</div>
  </div>
)

export default function ShoppingList() {
  const { items, isLoading, error, updateItem, deleteItem } = useItemsApi()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (isLoading) {
    return <Message>Loading items...</Message>
  }

  if (items.length === 0) {
    return <Message>No items in the list</Message>
  }

  return (
    <div className="space-y-4">
      {items.map((item: Item) => (
        <ShoppingListItem
          key={item._id?.toString()}
          item={item}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />
      ))}
    </div>
  )
} 