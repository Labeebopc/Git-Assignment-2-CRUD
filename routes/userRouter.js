const express = require('express');

const { Register, Login} = require('../controllers/userController.js')

const router = express.Router()


// Register and Login
router.post('/register', Register)
router.post('/login', Login)

module.exports = router;