import mongoose from 'mongoose';
import process from 'process';
import { initSchema } from '../entity';

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
  cached = global.mongoose = { conn: null, promise: null }
}

// Create connection to db if not already created
async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  console.log("no cached")
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    console.log("creating...")
    cached.promise = mongoose.connect(dbConnection, opts).then((mongoose) => {
      console.log("created new connection successfully")
      initSchema()
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