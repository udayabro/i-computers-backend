import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    city : String
})

const Student = mongoose.model("Student",studentSchema)    //create model to manage collection (student collection)

export default Student