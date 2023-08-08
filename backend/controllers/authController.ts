import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    });

    if (!usuario) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos - email'
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.dataValues.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    const token = await generarJWT(usuario.dataValues.email);

    await usuario.update({ ...usuario.dataValues, token: token as string });
    res.status(200).json({
      email: usuario.dataValues.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Se ha producido un error'
    });
  }
};
