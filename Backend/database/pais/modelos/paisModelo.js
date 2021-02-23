const {DataTypes} = require("sequelize");
const sequelize = require("../../index");
const regionModel = require("../../region/modelos/regionModelo");

const countryModel = sequelize.define(
	'countries',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		regionId: {
			type: DataTypes.INTEGER,
			references: {
				model: regionModel,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{ timestamps: false }
);
countryModel.belongsTo(regionModel, { 
	onDelete: 'cascade' 
});

module.exports = countryModel;