const {DataTypes} = require("sequelize");
const companyModel = require("../../compania/modelos/companiaModelo")
const countryModel = require("../../pais/modelos/paisModelo");
const sequelize = require("../../index");

const cityModel = sequelize.define(
	'cities',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		countryId: {
			type: DataTypes.INTEGER,
			references: {
				model: countryModel,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{ timestamps: false }
);

cityModel.belongsTo(countryModel, { 
	onDelete: 'cascade' 
});
companyModel.belongsTo(cityModel, 
	{ onDelete: 'cascade' 
});
module.exports = cityModel;