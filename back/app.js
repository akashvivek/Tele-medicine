const express = require('express')
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload= require("express-fileupload")
const cors = require("cors");
const session = require("express-session");


const errorMiddleware = require('./middleware/error.js')

app.use(
  session({
    secret: process.env.SESSION_SECRET || "Hellomoto",
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true
  }))
  app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//Route Imports
const user = require('./routes/userRoute')
const contact = require('./routes/contactRoute')
const patient = require('./routes/patientRoutes')


app.use('/api',user)
app.use('/api',contact)
app.use('/api',patient)
// app.use('/api',hospital)




//middleware for error
app.use(errorMiddleware)

module.exports = app