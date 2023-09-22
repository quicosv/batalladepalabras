export class Partida {
	numeroJugadores: number;
	idPartida: number;
	nombre: string;
	numeroLetras: number;

	constructor(idPartida: number, nombre: string, numeroLetras: number) {
		this.idPartida = idPartida;
		this.nombre = nombre;
		this.numeroLetras = numeroLetras;
		this.numeroJugadores = 1;
	}

	esPartidaLlena(): boolean {
		return this.numeroJugadores >= 2;
	}

	addJugador(): void {
		if (!this.esPartidaLlena()) {
			this.numeroJugadores++;
		}
	}

	esPartidaVacia(): Boolean {
		return this.numeroJugadores === 0;
	}
eliminarJuagdor (): void {
	if (!this.esPartidaVacia()) {
		this.numeroJugadores--;
	}
}
}
