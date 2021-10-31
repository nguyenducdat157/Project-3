const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const nofiSchema = new mongoose.Schema({
    content: {
        type: String,
        required
    }, 
    post: {
        type: ObjectId, ref: 'Post'
    },
    createdBy: {
        type: ObjectId, ref: "User"
    }
},{timestamps:true})

mongoose.model("Notification", nofiSchema)