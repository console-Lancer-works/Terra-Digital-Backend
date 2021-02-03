const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class User extends Model { }

User.init(
	{
		id: { type: Sequelize.BIGINT(20), autoIncrement: true, allowNull: false, primaryKey: true },
		first_name: { type: Sequelize.STRING(50), allowNull: true },
		last_name: { type: Sequelize.STRING(50), allowNull: true },
		user_name: { type: Sequelize.STRING(180), allowNull: true },
		signup_type: { type: Sequelize.STRING(180), allowNull: false },
		password: { type: Sequelize.STRING(765), allowNull: false },
		user_nickname: { type: Sequelize.STRING(150), allowNull: true },
		email: { type: Sequelize.STRING(300), allowNull: false },
		user_url: { type: Sequelize.STRING(300), allowNull: true },
		user_registered: { type: Sequelize.DATE, allowNull: true },
		user_activation_key: { type: Sequelize.STRING(765), allowNull: true },
		user_status: { type: Sequelize.INTEGER, allowNull: true },
		email_verified: { type: Sequelize.TINYINT, allowNull: true },
		mobile_verified: { type: Sequelize.TINYINT, allowNull: true },
		home_domain: { type: Sequelize.INTEGER, allowNull: true },
		display_name: { type: Sequelize.STRING(750), allowNull: true },
		spam: { type: Sequelize.TINYINT(2), allowNull: true },
		deleted: { type: Sequelize.TINYINT(2), allowNull: true },
		email_verified: { type: Sequelize.TINYINT, allowNull: true },
		mobile_verified: { type: Sequelize.TINYINT, allowNull: true }
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: false
	}
)

module.exports = User
