import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './Configs/Mongodb.js'
import userRouter from './Routes/userRoutes.js'



//AP CONFIG

const PORT =process.env.PORT || 4000
const app =express()
await connectDB()

//INTIALIZE MIDDLEWARES
app.use(express.json())
app.use(cors())

//API ROUTES

app.get('/',(req,res)=>res.send("API Working"))

app.use('/api/user',userRouter)

app.listen(PORT , ()=>console.log("Server Running on Port ",PORT))