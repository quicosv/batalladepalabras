import { Request, Response } from "express";
import { Palabra } from "../models/palabra";

export const existePalabra = async (req: Request, res: Response) => {
	const { palabra } = req.params;
	try {
		const palabraRegistrada = await Palabra.findOne({
			where: { palabra: palabra },
		});
		res.status(200).json(palabraRegistrada);
	} catch (error) {
		res
			.status(500)
			.json({ msg: "No se ha encontrado la palabra en el diccionario." });
	}
};
