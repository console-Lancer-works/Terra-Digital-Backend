const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class RolePermission extends Model {}

RolePermission.init(
    {
        role_id: { type: Sequelize.INTEGER, allowNull: false },
        menu_id: { type: Sequelize.INTEGER, allowNull: false }
    },
    {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        timestamps: false
    }
)
RolePermission.removeAttribute('id')
module.exports = RolePermission
