const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        minlength:10
    },
    message:{
        type:String,
        required:true,
        minlength:3
    },
})

//we need a collection
const user=mongoose.model("user",userSchema);

module.exports=user;