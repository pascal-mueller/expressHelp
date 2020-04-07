const user_routes = require('./userRoutes')

module.exports = app => {
	app.use('/user', user_routes)
}

