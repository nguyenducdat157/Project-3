const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
     type:String,
     default:"https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_account-512.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    notifications: [{type:ObjectId, ref: "Notification"}],
    role: {
        type: number,
        default: 0,
        required
    },
    status: {
        type: number,
        default: 0,
        enum: [
            0, // public
            1, //private
            2, //blocked 
        ]
    }
    
})

mongoose.model("User",userSchema)