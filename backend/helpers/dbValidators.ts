import { Sala } from '../models/sala';
import { Jugador } from '../models/jugador';

export const emailExiste = async (email = '') => {
  const existeEmail = await Jugador.findOne({
    where: {
      email: email
    }
  });

  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

export const salaExiste = async (nombre = '') => {
  const existeSala = await Sala.findOne({
    where: {
      nombre: nombre
    }
  });

  if (existeSala) {
    throw new Error(`La sala: ${nombre}, ya está creada`);
  }
};
