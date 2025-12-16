const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
      {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "please input your password"]
    },

    cartList:{
        type: Array,
    },

    orderList:{
        type: Array
    },
    isAdmin: {
        type: Boolean
    },
},
{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)

