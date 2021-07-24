const authMiddleware = require("../models/middlewares/auth.middlewares")
const { Router } = require("express")
const { ratingController } = require("../controllers/ratings.controller")

const router = Router()

router.get("/rating/:id", ratingController.getRating)
router.post("/rating/:id", authMiddleware ,ratingController.createRating)

module.exports = router