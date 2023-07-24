import mongoose from 'mongoose'
import process from 'process'

// global.d.ts
// Just to get rid of the warning
declare global {
  var mongoose: any;
}

console.log("create db connection")
const dbConnection = process.env.DB_CONNECTION!
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  console.log("no cached")
  cached = global.mongoose = { conn: null, promise: null }
}

// Create connection to db if not already created
async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(dbConnection, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect