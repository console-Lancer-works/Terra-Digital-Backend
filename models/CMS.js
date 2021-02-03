const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class CMS extends Model {}

CMS.init(
    {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        code: { type: Sequelize.STRING(5), allowNull: false },
        content: { type: Sequelize.TEXT, allowNull: false},
        updated_at: { type: Sequelize.DATE, allowNull: true},
        updated_by: { type: Sequelize.INTEGER, allowNull: false}
    },
    {
        sequelize,
        modelName: 'CMS',
        tableName: 'cms_content',
        timestamps: false
    }
)

module.exports = CMS
