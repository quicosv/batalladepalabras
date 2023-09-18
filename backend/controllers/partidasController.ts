import { Request, Response } from "express";
import { Partida } from "../models/partida";

export const getPartidas = async (req: Request, res: Response) => {
	try {
		const partidas = await Partida.findAll();
		res.status(200).json(partidas);
	} catch (error) {
		res.status(500).json({
			msg: "Error en el acceso a datos",
		});
	}
};

export const insertPartida = async (req: Request, res: Response) => {
	const { nombre, numeroLetras } = req.body;

	try {
		const partida = await Partida.create({
			nombre,
			numeroLetras,
		});

		res.status(200).json({
			partida,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Hable con el administrador",
		});
	}
};
