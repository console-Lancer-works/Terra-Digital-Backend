const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const RolePermission = require('./RolePermission')
const Admin = require('./Admin')

const Model = Sequelize.Model
class Role extends Model {}

Role.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        name: { type: Sequelize.STRING(20), allowNull: false }
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false
    }
)

module.exports = Role
