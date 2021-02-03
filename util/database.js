const Sequelize = require('sequelize')

const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, null, null, {
	dialect     : 'mysql',
	replication : {
		read  : [
			{
				host     : `${process.env.DB_READ_HOST}`,
				username : `${process.env.DB_USER}`,
				password : `${process.env.DB_PASSWORD}`
			}
		],
		write : {
			host     : `${process.env.DB_WRITE_HOST}`,
			username : `${process.env.DB_USER}`,
			password : `${process.env.DB_PASSWORD}`
		}
	},
	pool        : {
		// If you want to override the options used for the read/write pool you can do so here
		max  : 20,
		idle : 30000
	}
})

module.exports = sequelize
