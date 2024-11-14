const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/home', (req, res) => {
    res.render('index');
})

router.get('/addtask', (req, res) => {
    res.render('addTodo');
})

router.get('/editTasks', (req, res) => {
    res.render('controlTask');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/tasks', (req, res) => {
    res.render('viewTasks');
})

module.exports = router;