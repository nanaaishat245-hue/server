const express = require("express")
const { protect} = require("../middleware/authMiddleware")
const { addToCart, removeFromCart, clearCart, getUserCart } = require("../controllers/cartController")
const router = express.Router()


router.post("/addToCart", addToCart),   
router.delete("/removeFromCart", removeFromCart),
router.delete("/clearCart", clearCart)
router.get("/getUserCart", protect, getUserCart)

module.exports = router;