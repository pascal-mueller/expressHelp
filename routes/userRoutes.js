const Router = require('express-promise-router')
const user_controller = require('../controllers/userController');

const router = new Router()

module.exports = router

// Get user by ID
router.get('/:id', user_controller.getById)

// Register new user
//router.post('/register', user_controller.register)

// Login
//router.get('/login', user_controller.login)