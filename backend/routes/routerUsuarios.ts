import { Router } from 'express';
import { insertUsuario } from '../controllers/usuariosController';
import { check } from 'express-validator';
import { emailExiste } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';

export const routerUsuarios = Router();

routerUsuarios.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').not().isEmpty().isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    validarCampos
  ],
  insertUsuario
);
