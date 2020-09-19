if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()    
}
const express = require('express')
const app = express()
const router = require('./router/index')
const errorHandler = require('./middlewares/errorHandlers')
const cors = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)


module.exports = app