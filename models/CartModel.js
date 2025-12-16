const mongoose = require("mongoose")
const UserModel = require("./UserModel")

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        cartList: {
            type: Array,
            defalut: []
        }
    }
)

module.exports = mongoose.model("Cart", cartSchema)