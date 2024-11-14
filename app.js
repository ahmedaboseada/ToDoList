const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const toDoRoutes = require('./routes/todoRoutes')
const toDoAPIs = require('./routes/todoAPIs')
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use('/', toDoRoutes)
app.use('/api', toDoAPIs)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

module.exports = app