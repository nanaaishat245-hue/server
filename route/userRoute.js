const express = require("express")
const { registerAdmin, registerUser, loginUser, loginStatus, getUserProfile, logoutUser } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()


router.post("/registerAdmin", registerAdmin)
router.post("/registerUser", registerUser)
router.post("/login", loginUser)
router.get("/loginStatus", loginStatus)
router.post("/logOut",  logoutUser)
router.get("/UserProfile", protect,  getUserProfile)

module.exports = router;