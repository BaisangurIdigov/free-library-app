const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
require('dotenv').config()


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('./routes/users.route'))
app.use(require('./routes/books.route'))

const URL = process.env.URL
const PORT = process.env.PORT

async function start() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log("Server has been ..." + process.env.PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();