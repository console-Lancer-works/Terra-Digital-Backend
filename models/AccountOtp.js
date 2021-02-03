const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class AccountOtp extends Model {}

AccountOtp.init(
	{
		id           : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		account_type : { type: Sequelize.CHAR(4), allowNull: false },
		account_id   : { type: Sequelize.INTEGER, allowNull: false },
		otp          : { type: Sequelize.INTEGER, allowNull: false },
		expiry_date  : { type: Sequelize.DATE, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'AccountOtp',
		tableName  : 'account_otps',
		timestamps : true
	}
)

module.exports = AccountOtp
