import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './configs/mongodb.js'
import { clerkwebhookse } from './controllers/webhooks.js'
//initialize express
const app=express()
// connect to database
await connectdb()
// middleware
app.use(cors())  // to connect backend with any other domain

//routes
app.get('/',(req,res)=>res.send("API Working"))

app.post('/clerk')
//Port
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})