import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { Jugador } from "../models/jugador";
import { generarJWT } from "../helpers/generarJWT";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const jugador = await Jugador.findOne({
			where: {
				email: email,
			},
		});

		if (!jugador) {
			return res.status(401).json({
				msg: "Jugador / Password no son correctos - email",
			});
		}

		const validPassword = bcryptjs.compareSync(
			password,
			jugador.dataValues.password
		);
		if (!validPassword) {
			return res.status(401).json({
				msg: "Jugador / Password no son correctos - password",
			});
		}

		const token = await generarJWT(jugador.dataValues.email);

		await jugador.update({ ...jugador.dataValues, token: token as string });
		res.status(200).json({
			email: jugador.dataValues.email,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Se ha producido un error",
		});
	}
};
