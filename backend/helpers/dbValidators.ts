import { Partida } from "../models/partida";
import { Jugador } from "../models/jugador";

export const emailExiste = async (email = "") => {
	const existeEmail = await Jugador.findOne({
		where: {
			email: email,
		},
	});

	if (existeEmail) {
		throw new Error(`El email: ${email}, ya está registrado`);
	}
};

export const partidaExiste = async (nombre = "") => {
	const existePartida = await Partida.findOne({
		where: {
			nombre: nombre,
		},
	});

	if (existePartida) {
		throw new Error(
			`No se puede crear. La partida ${nombre} ya existe. Elija otro diferente`
		);
	}
};
export const numeroLetrasValidoPartida = async (numeroLetras: number) => {
	if (numeroLetras < 1 || numeroLetras > 23) {
		throw new Error(
			`No se puede crear la partida. El número de letras (${numeroLetras}) debe estar entre 1 y 23.`
		);
	}
};