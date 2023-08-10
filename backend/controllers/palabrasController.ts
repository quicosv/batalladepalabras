
import { Request, Response } from 'express';
import { Palabra } from '../models/palabra';

export const getPalabra = async (req: Request, res: Response) => {
	const {palabra} = req.params;
	const palabraRegistrada = await Palabra.findByPk(palabra);
	res.status(200).json(palabraRegistrada);
}