import { DataTypes, Model } from "sequelize";
import { db } from "../database/config";

interface JugadorAttributes {
	email: string;
	password: string;
	token: string;
}

export const Jugador = db.define<Model<JugadorAttributes>>(
	"Jugador",
	{
		email: {
			type: DataTypes.STRING(100),
			primaryKey: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "",
		},
	},
	{
		tableName: "jugadores",
	}
);
