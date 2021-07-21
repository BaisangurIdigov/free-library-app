const { Router } = require("express")
const { reviewsController } = require("../controllers/reviews.controller")

const router = Router()

router.get("/reviews", reviewsController.getReview)
router.post("/reviews/:id", reviewsController.createReview)
router.delete("/reviews/:id", reviewsController.deleteReview)

module.exports = router