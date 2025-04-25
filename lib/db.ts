import { Collection } from 'mongodb'
import clientPromise from './mongodb'
import { Item } from '@/types/item'

export async function getItemCollection(): Promise<Collection<Item>> {
  const client = await clientPromise
  const db = client.db()
  return db.collection<Item>('Items')
}
