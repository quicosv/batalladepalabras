import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generamos nuestro propio proceso asíncrono (Promise) para generar el token
export const generarJWT = (email: string) => {
	return new Promise((resolve, reject) => {
		const payload = { email };

		// jwt nos va a crear un token bajo una firma con una expiración determinada (2 horas en nuestro caso)
		jwt.sign(
			payload,
			process.env.SECRETPRIVATEKEY || '',
			{
				expiresIn: '2h' // 20s para probar el refresco
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};
