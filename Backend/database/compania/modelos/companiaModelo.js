const {DataTypes} = require("sequelize");
const sequelize = require("../../index");

const companyModel = sequelize.define(
	'companies',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},

		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = companyModel;