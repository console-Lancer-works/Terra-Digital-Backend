const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyMetadata extends Model {}

PropertyMetadata.init(
    {
        id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
        rendered: { type: Sequelize.TEXT, allowNull: true },
        alias: { type: Sequelize.TEXT, allowNull: true },
        meta_description: { type: Sequelize.TEXT, allowNull: true },
        meta_keywords: { type: Sequelize.TEXT, allowNull: true },
        textsearch: { type: Sequelize.TEXT, allowNull: true }
    },
    {
        sequelize,
        modelName: 'PropertyMetadata',
        tableName: 'property_metadatas',
        timestamps: false
    }
)

module.exports = PropertyMetadata
