'use client'

import { Item } from '@/types/item'
import {
  fetchItems as apiFetchItems,
  createItem as apiCreateItem,
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
} from './requests'
import { useCallback, useEffect, useState } from 'react'

export function useItemsApi() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const withErrorHandling = useCallback(
    async <T>(operation: () => Promise<T>, errorMessage: string): Promise<T | null> => {
      try {
        setError(null)
        setIsLoading(true)
        return await operation()
      } catch (err) {
        setError(err instanceof Error ? err.message : errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const fetchItems = useCallback(async () => {
    await withErrorHandling(async () => {
      const items = await apiFetchItems()
      setItems(items)
      return items
    }, 'An error occurred')
  }, [withErrorHandling])

  const createItem = useCallback(
    async (item: Omit<Item, '_id'>) => {
      return withErrorHandling(async () => {
        const newItem = await apiCreateItem(item)
        setItems((current) => [...current, newItem])
        return newItem
      }, 'Failed to create item')
    },
    [withErrorHandling]
  )

  const updateItem = useCallback(
    async (id: string, updates: Partial<Item>) => {
      return withErrorHandling(async () => {
        const updatedItem = await apiUpdateItem(id, updates)
        setItems((current) =>
          current.map((item) => (item._id?.toString() === id ? updatedItem : item))
        )
        return updatedItem
      }, 'Failed to update item')
    },
    [withErrorHandling]
  )

  const deleteItem = useCallback(
    async (id: string) => {
      await withErrorHandling(async () => {
        await apiDeleteItem(id)
        setItems((current) => current.filter((item) => item._id?.toString() !== id))
        return true
      }, 'Failed to delete item')
    },
    [withErrorHandling]
  )

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return {
    items,
    isLoading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
