import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generarJWT } from '../helpers/generarJWT';
import { Jugador } from '../models/jugador';

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

export const validarJWTSocket = (token: string | undefined) => {
	if (!token) {
		return false;
	}
	try {
		jwt.verify(token, process.env.SECRETPRIVATEKEY || '');
		return true;
	} catch (error) {
		return false;
	}
};

const refreshJWT = async (req: Request, res: Response) => {
	const token = req.header('x-token')!;
	const { email } = jwt.decode(token) as jwt.JwtPayload;
	const jugador = await Jugador.findByPk(email);
	try {
		if (jugador && jugador.dataValues.token === token) {
			const newToken = await generarJWT(email);
			await jugador.update({ ...jugador.dataValues, token: newToken as string });
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
