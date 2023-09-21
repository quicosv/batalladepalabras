export class Partida {
	private numeroJugadores: number;
	private idPartida: number;
	private nombre: string;
	private numeroLetras: number;

	constructor(idPartida: number, nombre: string, numeroLetras: number) {
		this.idPartida = idPartida;
		this.nombre = nombre;
		this.numeroLetras = numeroLetras;
		this.numeroJugadores = 1;
	}

	esPartidaLlena(): boolean {
		return this.numeroJugadores >= 2;
	}
}
