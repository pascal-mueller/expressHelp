const db = require('../db')
const bcrypt= require('bcrypt');

// Get user by ID
const get = async (id) => {
	// Set up query object
	const query = {
		text: 'SELECT * FROM users where id=$1',
		values: [id]
	}

	try {
		// Get user by id
		const { rows } = await db.query(query)
		return rows[0]
	} catch (err) {
		// server side error occured
		return null
	}
}

// Create new user
const create = async (user) => {
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
	get,
	create
}