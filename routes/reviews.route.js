const authMiddleware = require("../models/middlewares/auth.middlewares")
const { Router } = require("express")
const { reviewsController } = require("../controllers/reviews.controller")

const router = Router()

router.get("/reviews", reviewsController.getReview)
router.post("/reviews/:id", authMiddleware ,reviewsController.createReview)
router.delete("/reviews/:id", reviewsController.deleteReview)

module.exports = router