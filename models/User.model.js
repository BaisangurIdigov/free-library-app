const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    img: {
      type: String,
    },
    login: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
    },
    phone: {
      type: String,
    },
    wallet: {
      type: Number,
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
