export class JugadorConectado {
	email: string;
	idSesion: string;
	sala: string;

	constructor(email: string, idSesion: string) {
		this.idSesion = idSesion;
		this.email = email;
		this.sala = '';
	}
}
