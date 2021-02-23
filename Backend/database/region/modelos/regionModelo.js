const {DataTypes} = require("sequelize");
const sequelize = require("../../index");

const regionModel = sequelize.define(
	'regions',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = regionModel;