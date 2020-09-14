require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router/index')
const errorHandler = require('./middlewares/errorHandlers')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errorHandler)


module.exports = app