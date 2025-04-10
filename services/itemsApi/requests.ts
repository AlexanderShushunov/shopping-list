import { Item } from '@/types/item'

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch('/api/items')
  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }
  return response.json()
}

export async function createItem(item: Omit<Item, '_id'>): Promise<Item> {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    throw new Error('Failed to create item')
  }

  return response.json()
}

export async function updateItem(id: string, updates: Partial<Item>): Promise<Item> {
  const response = await fetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update item')
  }

  return response.json()
}

export async function deleteItem(id: string): Promise<void> {
  const response = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete item')
  }
}
