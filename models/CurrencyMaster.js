const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class CurrencyMaster extends Model {}

CurrencyMaster.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        symbol: { type: Sequelize.STRING(255), allowNull: true },
        abbr: { type: Sequelize.STRING(10), allowNull: true },
        name: { type: Sequelize.STRING(50), allowNull: true },
        country: { type: Sequelize.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: 'CurrencyMaster',
        tableName: 'currency_masters',
        timestamps: false
    }
)

module.exports = CurrencyMaster
