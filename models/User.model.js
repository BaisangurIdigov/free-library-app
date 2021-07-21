const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    img:{
      type:String
    },
    login: {
      type: String ,
      unique:true,
      required:true,
    },
    password:{
      type: String,
      required:true,
    },
    wallet: {
      type: String,
    },
},
  { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;