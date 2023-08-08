import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';

dotenv.config();

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición'
		});
	}

	try {
		jwt.verify(token, process.env.SECRETPRIVATEKEY || '');
		next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			if (error.name === 'TokenExpiredError') {
				refreshJWT(req, res);
			}
		} else {
			res.status(401).json({
				msg: 'Token no válido'
			});
		}
	}
};

const refreshJWT = async (req: Request, res: Response) => {
	const token = req.header('x-token')!;
	const { email } = jwt.decode(token) as jwt.JwtPayload;
	const usuario = await Usuario.findByPk(email);
	try {
		if (usuario && usuario.dataValues.token === token) {
			const newToken = await generarJWT(email);
			await usuario.update({ ...usuario.dataValues, token: newToken as string });
			res.status(200).json({
				newToken: newToken
			});
		} else {
			res.status(401).json({
				msg: 'Token no válido'
			});
		}
	} catch (error) {
		res.status(500).json({
			msg: 'Error en el acceso a datos'
		});
	}
};
