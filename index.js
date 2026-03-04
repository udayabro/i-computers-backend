import express, { request } from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import authenticateUser from "./middleweares/authentication.js"
import productRouter from "./routers/productRouter.js"

const app = express()

const mongodbURI = "mongodb+srv://admin:1234@cluster0.as15vtj.mongodb.net/icomputers?appName=Cluster0"

mongoose.connect(mongodbURI).then(
    () => {
        console.log("connected to Mongodb")
    }
)

app.use(express.json()) //middleware which use to convert http req data into json format

app.use(authenticateUser)

app.use("/users", userRouter)
app.use("/products", productRouter)

app.listen(3000, () => { console.log("Server is running on port 3000") }) //for one time use