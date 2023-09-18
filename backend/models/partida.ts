import { DataTypes, Model } from "sequelize";
import { db } from "../database/config";

interface PartidaAttributes {
	idPartida?: number;
	nombre: string;
	numeroLetras: number;
}

export const Partida = db.define<Model<PartidaAttributes>>(
	"Partida",
	{
		idPartida: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		numeroLetras: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
	},
	{
		tableName: "partidas",
	}
);
