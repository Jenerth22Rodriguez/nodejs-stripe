import express from 'express'
import paymentRouters from './routes/payment.routes.js'
import {PORT} from './config.js'
const app = express()

app.use(express.json()) 

app.use(paymentRouters)

app.listen (PORT)
console.log('Server on port', PORT)