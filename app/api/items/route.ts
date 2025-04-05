import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Collection } from 'mongodb'
import { Item } from '@/types/item'

async function getCollection(): Promise<Collection<Item>> {
  const client = await clientPromise
  const db = client.db('ShoppingList')
  return db.collection<Item>('Items')
}

export async function GET() {
  try {
    const collection = await getCollection()
    const items = await collection.find({}).toArray()
    
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, quantity = 1 } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const newItem: Omit<Item, '_id'> = {
      name,
      quantity,
      bought: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const collection = await getCollection()
    const result = await collection.insertOne(newItem as Item)

    return NextResponse.json(
      { ...newItem, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to create item:', error)
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
} 