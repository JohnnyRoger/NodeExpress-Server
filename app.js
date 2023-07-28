const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const WebRoutes = require('./routes/web')
const { connect } = require('./config/database')
const cors = require('cors')
const logger = require('./utils/logger');
require('dotenv').config()

//* express app
const app = express()
const port = process.env.APP_PORT
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))