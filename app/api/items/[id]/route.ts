import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { Item } from '@/types/item'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, quantity, bought } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const collection = client.db('ShoppingList').collection<Item>('Items')

    const updateData: Partial<Item> = {
      name,
      quantity,
      bought,
      updatedAt: new Date()
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      const typedKey = key as keyof Item
      updateData[typedKey] === undefined && delete updateData[typedKey]
    })

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to update item:', error)
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
} 