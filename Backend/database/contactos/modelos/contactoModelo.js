const {DataTypes} = require("sequelize");
const sequelize = require("../../index");
const cityModel = require("../../ciudad/modelos/ciudadModelo")
const companyModel = require("../../compania/modelos/companiaModelo");

const contactModel = sequelize.define(
	'contacts',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		occupation: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		companyId: {
			type: DataTypes.INTEGER,
			references: {
				model: companyModel,
				key: 'id',
			},
			allowNull: false,
		},
		cityId: {
			type: DataTypes.INTEGER,
			references: {
				model: cityModel,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{ timestamps: false }
);
contactModel.belongsTo(cityModel, { 
	onDelete: 'cascade' 
});
contactModel.belongsTo(companyModel, { 
	onDelete: 'cascade' 
});

module.exports = contactModel;