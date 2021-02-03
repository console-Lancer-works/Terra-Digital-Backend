const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class AreaUnitMaster extends Model {}

AreaUnitMaster.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        unit: { type: Sequelize.STRING(10), allowNull: false }
    },
    {
        sequelize,
        modelName: 'AreaUnit',
        tableName: 'area_unit_masters',
        timestamps: false
    }
)

module.exports = AreaUnitMaster
