const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        required: [true, "Please add your email"]
    },
    phone: {
        type: String,
        required: [true, "Please add your contact phone number"]
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("contact", contactSchema);