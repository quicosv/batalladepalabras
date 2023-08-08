import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';

export const insertUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const salt = bcryptjs.genSaltSync();
    const passwordEncriptado = bcryptjs.hashSync(password, salt);

    const token = await generarJWT(email);

    const usuario = await Usuario.create({
      email,
      password: passwordEncriptado,
      token: token as string
    });

    res.status(200).json({
      email: usuario.dataValues.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};
