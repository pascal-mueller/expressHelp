const user_model = require('../models/userModel')

const getById = async (req, res) => {
	user_data = req.params

	if (typeof user_data.id === 'number') {
		try {
			user = await user_model.getById(user_data.id)
			// User not found
			if (user === null) {
				res.status(404)
				res.send("User not found.")
			} else {
				res.send(user)
			}
		} catch (err) {
			res.status(500)
			res.send("Something went wrong on the server")
		}
	} else {
		res.status(400).send("Illegal URL syntax")
	}
}

const register = async (req, res) => {
	return 
}

module.exports = {
	getById,
}