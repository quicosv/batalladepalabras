import { Partida } from "./Partida";

export class JugadorConectado {
	email: string;
	idSesion: string;

	constructor(email: string, idSesion: string, partida: Partida) {
		this.idSesion = idSesion;
		this.email = email;
	}
}
