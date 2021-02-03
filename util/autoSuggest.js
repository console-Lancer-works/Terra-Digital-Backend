const General = require('./general')

const Province = require('../models/Province')
const City = require('../models/City')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = async (country, searchKeywords) => {
	let provinces = await Province.findAll({
		attributes : [
			[
				'id',
				'province_id'
			],
			[
				'name',
				'province_name'
			]
		],
		where      : { name: { [Op.like]: `%${searchKeywords}%` }, country_id: country }
	})
	let cities = await City.findAll({
		attributes : [
			[
				'id',
				'city_id'
			],
			[
				'name',
				'city_name'
			]
		],
		where      : { name: { [Op.like]: `%${searchKeywords}%` } },
		include    : [
			{
				model      : Province,
				attributes : [
					[
						'id',
						'province_id'
					],
					[
						'name',
						'province_name'
					]
				],
				where      : { country_id: country }
			}
		]
	})
	let suggestions = [
		...cities,
		...provinces
	]
	suggestions = General.jsonToObject(suggestions)

	suggestions.map((suggestion) => {
		if (suggestion.Province !== undefined) {
			suggestion.province_id = suggestion.Province.province_id
			suggestion.province_name = suggestion.Province.province_name
			delete suggestion.Province
		}
	})

	return suggestions
}
