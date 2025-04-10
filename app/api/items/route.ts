import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { Item } from '@/types/item'
import { getItemCollection } from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collection = await getItemCollection()
    const items = await collection.find({}).toArray()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, quantity = 1 } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const newItem: Omit<Item, '_id'> = {
      name,
      quantity,
      bought: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getItemCollection()
    const result = await collection.insertOne(newItem as Item)

    return NextResponse.json({ ...newItem, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Failed to create item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
