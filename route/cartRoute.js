const express = require("express")
const { protect} = require("../middleware/authMiddleware")
const { addToCart, removeFromCart, clearCart, getUserCart } = require("../controllers/cartController")
const router = express.Router()


router.post("/addToCart", protect, addToCart),   
router.delete("/removeFromCart", protect, removeFromCart),
router.delete("/clearCart", protect, clearCart)
router.get("/getUserCart", protect, getUserCart)

module.exports = router;