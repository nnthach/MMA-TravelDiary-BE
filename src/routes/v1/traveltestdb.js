

import {env} from '~/config/environment.js'// Hoặc dùng import dotenv from 'dotenv'; dotenv.config();



import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from './config/mongodb.js'  // dùng đường dẫn tương đối + .js
import {APIs_V1} from '~/routes/v1'
const hostname = 'localhost'
const port = 3000

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
   res.end('<h1> Hello World!</h1><hr>!')
  })
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hi ${env.AUTHOR }, Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('Process exiting, closing MongoDB connection...')
    CLOSE_DB()
  })
}

;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas...')

    START_SERVER()
  } catch (error) {
    console.error(' MongoDB connection error:', error)
    process.exit(1)
  }
})()

// CONNECT_DB()
//   .then(() => {
//     console.log(' Connected to MongoDB Cloud Atlas!')
//     START_SERVER()
//   })
//   .catch(error => {
//     console.error('MongoDB connection error:', error)
//     process.exit(1)
//   })
