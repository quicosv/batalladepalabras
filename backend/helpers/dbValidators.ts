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
