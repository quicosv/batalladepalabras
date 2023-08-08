import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Si no ejecutamos config() no abrimos el acceso a las variables de entorno del archivo .env
dotenv.config();

export const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		timestamps: false // Para que no ponga a las tablas el campo createdAt ni updatedAt
	}
});

export const dbConnection = async () => {
	try {
		await db.authenticate();
		console.log('Conectado correctamente a base de datos MySQL ' + process.env.DB_NAME);
	} catch (error) {
		console.error('No se ha podido establecer conexion con el servidor MySQL:', error);
	}
};
