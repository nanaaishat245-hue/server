const express = require("express")
const { createEbook, updateEbook, getAnEbook, getAllEbook } = require("../controllers/ebookController")
const {adminProtect} = require("../middleware/authMiddleware")
const router = express.Router()



router.post("/createEbook", adminProtect, createEbook);
router.patch("/updateEbook/:id", adminProtect, updateEbook);
router.get("/getAllEbook",  getAllEbook);
router.get("/singleEbook/:id", getAnEbook);

module.exports = router;