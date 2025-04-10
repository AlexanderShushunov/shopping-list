import { hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const client = new MongoClient(MONGODB_URI)
await client.connect()

async function createUser(email: string) {
  if (!email) {
    console.error('Please provide an email address')
    process.exit(1)
  }

  const db = client.db()

  // Generate a strong password (16 characters with mixed case, numbers, and symbols)
  const password = randomBytes(8).toString('hex')

  const user = {
    email,
    name: email.split('@')[0], // Use part before @ as name
    password: await hash(password, 12),
  }

  const existingUser = await db.collection('users').findOne({ email })
  if (existingUser) {
    console.log(`User already exists: ${email}`)
    process.exit(0)
  }

  await db.collection('users').insertOne(user)
  console.log(`User created successfully!`)
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log('\nPlease save this password as it will not be shown again.')

  await client.close()
  process.exit(0)
}

const email = process.argv[2]
if (!email) {
  console.error('Please provide an email address')
  process.exit(1)
}

createUser(email).catch((error) => {
  console.error('Error creating user:', error)
  process.exit(1)
})
