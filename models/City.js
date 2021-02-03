const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Province = require('../models/Province')

const Model = Sequelize.Model
class City extends Model {}

City.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        province_id: { type: Sequelize.INTEGER, allowNull: false },
        name: { type: Sequelize.STRING(50), allowNull: false }
    },
    {
        sequelize,
        modelName: 'City',
        tableName: 'cities',
        timestamps: false
    }
)

City.belongsTo(Province, { foreignKey: 'province_id' })

module.exports = City
