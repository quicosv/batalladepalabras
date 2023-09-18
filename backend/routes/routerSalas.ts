import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { getPartidas, insertPartida } from '../controllers/partidasController';
import { salaExiste } from '../helpers/dbValidators';
import { validarJWT } from '../middlewares/validarJWT';

export const routerSalas = Router();

routerSalas.get('/', getPartidas);

routerSalas.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre de la sala es obligatorio').not().isEmpty(),
		check('nombre').custom(salaExiste),
		validarCampos
	],
	insertPartida
);
