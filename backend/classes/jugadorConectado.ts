import { Partida } from "./partida";

export class JugadorConectado {
	email: string;
	idSesion: string;
	partida: Partida;

	constructor(email: string, idSesion: string, partida: Partida) {
		this.idSesion = idSesion;
		this.email = email;
		this.partida = partida;
	}
}
