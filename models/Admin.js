const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Role = require('./Role')

const Model = Sequelize.Model
class Admin extends Model {}

Admin.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        name: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING(100), allowNull: false },
        password: { type: Sequelize.STRING(200), allowNull: false },
        profile_image: { type: Sequelize.STRING(200), allowNull: true },
        role_id: { type: Sequelize.INTEGER, allowNull: false },
        is_deleted: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
        is_super_admin: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 }
    },
    {
        sequelize,
        modelName: 'Admin',
        tableName: 'admins',
        timestamps: false
    }
)

Admin.belongsTo(Role, { foreignKey: 'role_id' })

module.exports = Admin
