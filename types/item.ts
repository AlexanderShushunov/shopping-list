import { ObjectId } from 'mongodb'

export interface Item {
  _id?: ObjectId
  name: string
  quantity: number
  bought: boolean
  createdAt: Date
  updatedAt: Date
} 