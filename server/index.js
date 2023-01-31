import express from 'express'
import * as dotenv from "dotenv"
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import tochkaRoutes from './routes/tochkaRoutes.js'
dotenv.config()

const app=express()

app.use(cors())
app.use(express.json({limit:"50mb"}))

app.use('/api/v1/post',postRoutes)// we created api endpoints that we can hook from the front end
app.use("/api/v1/tochka",tochkaRoutes)

app.get('/',async (req,res)=>{
    res.send("hello from ghadi")
})

const startServer= async ()=>{//we want to connect but this can fail so we create this try and catch
      try{
        connectDB(process.env.MONGODB_URL);//special url of our mongodb database
        app.listen(3008,()=> console.log("server has started on port http://localhost:3008 "))
 }
 catch(error){
    console.log(error)
 }


}

startServer()