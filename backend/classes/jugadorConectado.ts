export class JugadorConectado {
	email: string;
	idSesion: string;
	partida: string;

	constructor(email: string, idSesion: string) {
		this.idSesion = idSesion;
		this.email = email;
		this.partida = "";
	}
}
