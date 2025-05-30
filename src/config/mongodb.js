import { MongoClient, ServerApiVersion } from 'mongodb'
import {env} from '~/config/environment.js'


let travelDiaryDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
    tls: true,

})



export const CONNECT_DB = async () => {
  try {
    await mongoClientInstance.connect()
    travelDiaryDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
    console.log(' Connected to MongoDB successfully')
  } catch (error) {
    console.error(' Failed to connect to MongoDB:', error)
    throw error
  }
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!travelDiaryDatabaseInstance) throw new Error('Must connect to Database first')
  return travelDiaryDatabaseInstance
}

