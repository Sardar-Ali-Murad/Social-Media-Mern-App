import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import fileUpload from "express-fileupload"

import connectDB from './db/connect.js'
import Auth from "./routes/AuthRoute.js"
import Pins from "./routes/PinsRoute.js"
import Authenticate from "./middleware/auth.js"
import Review from "./routes/ReviewRoute.js"
import Saves from "./routes/SaveRoute.js"
// import Posts from "./routes/PostRoute.js"
// const cloudinary = require('cloudinary').v2

import cors from "cors"

import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


import helmet from 'helmet'

import mongoSanitize from "express-mongo-sanitize"

import xssclean from "xss-clean"
import rateLimit from 'express-rate-limit'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// import rateLimit from "express-rate-limit"

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })


import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
// import Auth from "../routes/AuthRoute.js"


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use(express.json())


app.use(fileUpload({ useTempFiles: true }));

const __dirname = dirname(fileURLToPath(import.meta.url))
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(xssclean())
app.use(mongoSanitize())


app.use(
  [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      // connectSrc: ["'self'", 'https://checkout.stripe.com'],
      // frameSrc: ["'self'", 'https://checkout.stripe.com'],
      // childSrc: ["'self'", 'https://checkout.stripe.com'],
      // scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      // styleSrc: [
      //   "'self'",
      //   'https://fonts.googleapis.com',
      //   'https://checkout.stripe.com',
      // ],
      // fontSrc: ["'self'", 'https://fonts.gstatic.com'],

      // imgSrc: ["*",'https://*.stripe.com', 'https://res.cloudinary.com','https://images.unsplash.com','data:'],


        // The Below Allow All and the base 64 image but above we are listing
       imgSrc: ["*", 'data:'],
      // imgSrc: ["'self','https://*.stripe.com', 'https://res.cloudinary.com'"],
      baseUri: ["'self'"],
      'script-src': ["'self'", ],
      'connect-src': ["'self'", ],
      'frame-ancestors': ["'self'",],
      // sandbox: ['allow-forms', 'allow-scripts'],
      'script-src': ["'self'", ],

    },
  })
  ]
)

  

app.use("/api/v1/auth",Auth)
app.use("/api/v1/pins",Pins)
app.use("/api/v1/reviews",authenticateUser,Review)
app.use("/api/v1/save",authenticateUser,Saves)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
