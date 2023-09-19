import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { getPartidas, insertPartida } from "../controllers/partidasController";
import {
	numeroLetrasValidoPartida,
	partidaExiste,
} from "../helpers/dbValidators";
import { validarJWT } from "../middlewares/validarJWT";

export const routerPartidas = Router();

routerPartidas.get("/", getPartidas);

routerPartidas.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre de la partida es obligatorio").not().isEmpty(),
		check("nombre").custom(partidaExiste),
		check(
			"numeroLetras",
			"El número de letras de la palabra en la partida es obligatorio"
		)
			.not()
			.isEmpty(),
		check(
			"numeroLetras",
			"El número de letras de la palabra en la partida debe de ser numérico"
		).isInt(),
		check("numeroLetras").custom(numeroLetrasValidoPartida),
		validarCampos,
	],
	insertPartida
);