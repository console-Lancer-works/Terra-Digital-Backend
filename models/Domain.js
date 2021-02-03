const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Op = Sequelize.Op

const Model = Sequelize.Model
class Domain extends Model { }

Domain.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: { type: Sequelize.STRING, allowNull: false },
		domain_name: { type: Sequelize.STRING, allowNull: false },
		active_campaign_list_id: { type: Sequelize.INTEGER, allowNull: false },
		ios_identifier_code: { type: Sequelize.STRING, allowNull: false },
		android_identifier_code: { type: Sequelize.STRING, allowNull: false },
		web_identifier_code: { type: Sequelize.STRING, allowNull: false },
		country_id: { type: Sequelize.INTEGER, allowNull: false },
		timezone: { type: Sequelize.STRING, allowNull: false },
		currency_id: { type: Sequelize.INTEGER, allowNull: false },
		ios_app_link: { type: Sequelize.STRING, allowNull: false },
		android_app_link: { type: Sequelize.STRING, allowNull: false },
		address_line1: { type: Sequelize.STRING, allowNull: false },
		address_line2: { type: Sequelize.STRING, allowNull: false },
		contact_number: { type: Sequelize.STRING, allowNull: false },
		email: { type: Sequelize.STRING, allowNull: false },
		facebook_link: { type: Sequelize.STRING, allowNull: false },
		instagram_link: { type: Sequelize.STRING, allowNull: false },
		twitter_link: { type: Sequelize.STRING, allowNull: false },
		linkedin_link: { type: Sequelize.STRING, allowNull: false },
		youtube_link: { type: Sequelize.STRING, allowNull: false },
		meta_tags: { type: Sequelize.STRING, allowNull: false },
		is_live: { type: Sequelize.TINYINT, allowNull: false },
		script_tags: { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName: 'Domain',
		tableName: 'domains',
		timestamps: false
	}
)

Domain.getDomainProperties = async (domainCode, keys) => {
	return await Domain.findOne({
		attributes: keys,
		where: {
			[Op.or]: [
				{ ios_identifier_code: domainCode },
				{ android_identifier_code: domainCode },
				{ web_identifier_code: domainCode }
			]
		}
	})
}

Domain.getDomainInfo = async (domainCode, key) => {
	let domain = await Domain.findOne({
		attributes: [
			key
		],
		where: {
			[Op.or]: [
				{ ios_identifier_code: domainCode },
				{ android_identifier_code: domainCode },
				{ web_identifier_code: domainCode }
			]
		}
	})
	return domain[key]
}

module.exports = Domain
