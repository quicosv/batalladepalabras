import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';

interface PalabraAttributes {
	palabra: string;
}

export const Palabra = db.define<Model<PalabraAttributes>>(
	'Palabra',
	{
		palabra: {
			type: DataTypes.STRING(25),
			primaryKey: true,
			allowNull: false
		}
	},
	{
		tableName: 'palabras'
	}
);