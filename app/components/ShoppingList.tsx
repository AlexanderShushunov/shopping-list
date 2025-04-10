'use client'

import { FC, useEffect } from 'react'
import { Item } from '@/types/item'
import { useItemsApi } from '@/services/itemsApi'
import { ShoppingListItem } from './ShoppingListItem'
import { toast } from 'react-hot-toast'
import { AddItemForm } from './AddItemForm'
import { LoadingIndicator } from './LoadingIndicator'

type MessageProps = {
  children: React.ReactNode
  className?: string
}

const Message = ({ children, className = 'text-gray-500' }: MessageProps) => (
  <div className="flex h-32 items-center justify-center">
    <div className={className}>{children}</div>
  </div>
)

export const ShoppingList: FC = () => {
  const { items, isLoading, error, createItem, updateItem, deleteItem } = useItemsApi()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div className="space-y-4">
      <LoadingIndicator isLoading={isLoading} />
      <AddItemForm onCreateItem={createItem} />
      {items.length === 0 ? (
        <Message>No items in the list</Message>
      ) : (
        items.map((item: Item) => (
          <ShoppingListItem
            key={item._id?.toString()}
            item={item}
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        ))
      )}
    </div>
  )
}
