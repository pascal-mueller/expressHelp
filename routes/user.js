const Router = require('express-promise-router')
const db = require('../db')
const userModel = require('../models/user');

const router = new Router()
module.exports = router

// Get user by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params

	const user = await userModel.get(id)

	if( user != null ) {
		res.status(200).send(user)
	} else {
		const errorMsg = "500 - Couldn't get user. Something went \
			terribly wrong. Please contact the web admin."
		res.status(500).send(errorMsg)
	}

})

// Register new user
router.post('/register', async (req, res) => {
	const userData = req.body
	console.log("registering new user")
	console.log(userData)

	const user = await userModel.create(userData)

	if( user != null ) {
		res.status(200).send(user)
	} else {
		const errorMsg = "500 - Couldn't register user. Something went \
			terribly wrong. Please contact the web admin."
		res.status(500).send(errorMsg)
	}

})