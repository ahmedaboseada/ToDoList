const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const toDoRoutes = require('./routes/todoRoutes')
const toDoAPIs = require('./routes/todoAPIs')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
import {injectSpeedInsights} from '@vercel/speed-insights';

injectSpeedInsights();
require('./events'); // Register all listeners
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,  // Provide the secret here directly
    resave: true,  // Set to false to prevent resaving the session if unchanged
    saveUninitialized: true,  // Only save sessions that are modified
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/session-store', // MongoDB connection URI for storing sessions
        ttl: 14 * 24 * 60 * 60 // Time to live in seconds (14 days by default)
    }),
    cookie: {
        httpOnly: true,  // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
    }
}))

app.use('/', toDoRoutes)
app.use('/api', toDoAPIs)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

module.exports = app