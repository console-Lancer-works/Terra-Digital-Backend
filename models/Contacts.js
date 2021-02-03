const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Contacts extends Model {}

Contacts.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		first_name: { type: Sequelize.STRING(50), allowNull: false },
		last_name: { type: Sequelize.STRING(50), allowNull: false },
		email: { type: Sequelize.STRING(100), allowNull: false },
		user_type: { type: Sequelize.STRING(100), allowNull: false },
		question_type: { type: Sequelize.STRING(100), allowNull: false },
		source: { type: Sequelize.STRING(100), allowNull: false },
		domain: { type: Sequelize.INTEGER, allowNull: false },
		message: { type: Sequelize.TEXT, allowNull: false }
	},
	{
		sequelize,
		modelName: 'Contacts',
		tableName: 'contacts',
		timestamps: false
	}
)

module.exports = Contacts
