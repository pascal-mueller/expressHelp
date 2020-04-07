const db = require('../db')
const bcrypt= require('bcrypt');

// Login user
const login = async (user, done) => {
	checkCredentials(user.username, user.password)

	// Case 1: Server error
	// Case 2: wrong credentials/User non-existent
	// Case 3: Success
}

// Get user by ID
//
// 200: User found
// 400: Bad Request
// 404: User not found
// 500: Server-side error
const getById = async (id) => {
	// Set up query object
	const query = {
		text: 'SELECT * FROM users where id=$1',
		values: [id]
	}

	try {
		// Get user by id
		const { rows } = await db.query(query)

		// Reutrn user
		if ( rows.length == 1) {
			return rows[0]
		}
		// Return null if no user with this id was found
		else {
			return null
		}
	} catch (err) {
		throw (err)
	}
}

// Create new user
const register = async (user) => {
	let passwordEncrypted = null
	try {
		// Encrypt password
		passwordEncrypted = await bcrypt.hash(user.password,10)
	} catch (err) {
		// Server side error occured
		return null
	}
	// Set up query object
	const query = {
		text: 'INSERT INTO users(username, email, password) \
			   VALUES($1, $2, $3) RETURNING *',
		values: [user.username, user.email, passwordEncrypted]
	}

	try {
		// Safe user to database
		const { rows } = await db.query(query)
		// Return safed user
		return rows[0]
	} catch (err) {
		// Server side error occured
		return null
	}

}

module.exports = {
	getById,
	register,
	login
}