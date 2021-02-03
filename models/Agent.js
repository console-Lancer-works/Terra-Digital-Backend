const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Model = Sequelize.Model;
class Agent extends Model { }

Agent.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    membership_id: { type: Sequelize.INTEGER, allowNull: true },
    membership_expiry_date: { type: Sequelize.DATE, allowNull: true },
    bitrix_id: { type: Sequelize.INTEGER, allowNull: true },
    stripe_user_id: { type: Sequelize.STRING, allowNull: true },
    home_domain: { type: Sequelize.INTEGER, allowNull: true },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    image_url: { type: Sequelize.STRING, allowNull: true },
    display_name: { type: Sequelize.STRING, allowNull: true },
    user_name: { type: Sequelize.STRING, allowNull: true },
    password: { type: Sequelize.STRING, allowNull: false },
    about: { type: Sequelize.TEXT, allowNull: true },
    company_name: { type: Sequelize.TEXT, allowNull: true },
    company_address: { type: Sequelize.TEXT, allowNull: true },
    website: { type: Sequelize.STRING, allowNull: true },
    main_email: { type: Sequelize.STRING, allowNull: true },
    secondary_email: { type: Sequelize.STRING, allowNull: true },
    user_email: { type: Sequelize.STRING, allowNull: true },
    phone: { type: Sequelize.STRING, allowNull: true },
    fax: { type: Sequelize.STRING, allowNull: true },
    mobile: { type: Sequelize.STRING, allowNull: true },
    isd_code: { type: Sequelize.STRING, allowNull: true },
    country_id: { type: Sequelize.INTEGER, allowNull: true },
    province_id: { type: Sequelize.INTEGER, allowNull: true },
    city_id: { type: Sequelize.INTEGER, allowNull: true },
    zip: { type: Sequelize.STRING, allowNull: true },
    featured: { type: Sequelize.TINYINT, allowNull: true, defaultValue: 0 },
    property_sync_url: { type: Sequelize.TEXT, allowNull: true },
    registered_at: { type: Sequelize.DATE, allowNull: true },
    language: { type: Sequelize.STRING, allowNull: true },
    service_area: { type: Sequelize.STRING, allowNull: true },
    title: { type: Sequelize.STRING, allowNull: true },
    agent_address: { type: Sequelize.TEXT, allowNull: true },
    cover_image_url: { type: Sequelize.STRING, allowNull: true },
    facebook_link: { type: Sequelize.STRING, allowNull: true },
    twitter_link: { type: Sequelize.STRING, allowNull: true },
    instagram_link: { type: Sequelize.STRING, allowNull: true },
    youtube_link: { type: Sequelize.STRING, allowNull: true },
    linkedin_link: { type: Sequelize.STRING, allowNull: true },
    provider: { type: Sequelize.STRING, allowNull: true },
    license: { type: Sequelize.STRING, allowNull: true },
    gender: { type: Sequelize.STRING, allowNull: true },
    date_of_birth: { type: Sequelize.DATE, allowNull: true },
    email_verification_code: { type: Sequelize.TEXT, allowNull: true },
    email_verified: { type: Sequelize.TINYINT, allowNull: true },
    mobile_verified: { type: Sequelize.TINYINT, allowNull: true },
    business_city_id: { type: Sequelize.INTEGER, allowNull: true },
    business_province_id: { type: Sequelize.INTEGER, allowNull: true },
    signup_type: { type: Sequelize.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Agent",
    tableName: "agents",
    timestamps: false,
  }
);

// Agent.belongsTo(MemberShip, { foreignKey: 'membership_id' })
// Agent.belongsTo(Country, { foreignKey: 'country_id' })
// Agent.belongsTo(Province, { foreignKey: 'province_id' })
// Agent.belongsTo(City, { foreignKey: 'city_id' })

module.exports = Agent;
