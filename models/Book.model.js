const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    rating: {
      type: String,
    },
    rend: mongoose.Schema(
      {
        _id: false,
        expires: {
          type: Number,
        },
        userRend: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
        },
        rendDate: {
          type: Date,
        },
      },
      { timestamps: true },

    ),
  },
  { timestamps: true }
);
const Book = model("Book", bookSchema);
module.exports = Book;
