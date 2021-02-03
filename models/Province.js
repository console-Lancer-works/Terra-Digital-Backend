const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Province extends Model {}

Province.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        country_id: { type: Sequelize.INTEGER, allowNull: false },
        name: { type: Sequelize.STRING(100), allowNull: false }
    },
    {
        sequelize,
        modelName: 'Province',
        tableName: 'provinces',
        timestamps: false
    }
)

module.exports = Province
