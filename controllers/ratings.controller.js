const Rating = require("../models/Rating.model");

module.exports.ratingController = {
  getRating: async (req, res) => {
    const rating = await Rating.find({ book: req.params.id }).populate("user").populate("book")
    res.json(rating)
  },
  createRating: async (req, res) => {
    const { number } = req.body
    const { id } = req.params
    try {
      const rating = await Rating.create({
        book: id,
        user: req.user.id,
        number
      })
      await rating.save()
      return res.json(rating)
    } catch (e) {
      return res.status(401).json(e.toString())
    }
  },
}