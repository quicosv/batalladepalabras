import { Request, Response } from 'express';
import { Sala } from '../models/sala';

export const getSalas = async (req: Request, res: Response) => {
  try {
    const salas = await Sala.findAll();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el acceso a datos'
    });
  }
};

export const insertSala = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  try {
    const sala = await Sala.create({
      nombre
    });

    res.status(200).json({
      sala
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};
