const express = require('express');
const router = express.Router();
// const {createUser} = require('../controllers/todoController')
const {createUser, loginUser} = require('../controllers/userController')

router.post('/createUser', createUser);
router.post('/login', loginUser);

module.exports = router;