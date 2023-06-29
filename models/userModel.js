const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add your name"]
    },
    email:{
        type: String,
        unique: [true, "Email already exist"]
    },
    password:{
        type: String,
        required:[true,"Please add your password"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User",userSchema);