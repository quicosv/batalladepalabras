import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';

interface PalabraAttributes {
	idpalabra?: number;
	palabra: string;
}

export const Palabra = db.define<Model<PalabraAttributes>>(
	'Palabra',
	{
		idpalabra: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		palabra: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	},
	{
		tableName: 'palabras'
	}
);