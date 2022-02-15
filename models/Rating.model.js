const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  { timestamps: true }
);

const Rating = model("Rating", ratingSchema);
module.exports = Rating;
