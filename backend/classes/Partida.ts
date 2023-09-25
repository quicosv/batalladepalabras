import { JugadorConectado } from "./jugadorConectado";

export class Partida {
	jugadores: JugadorConectado[];
	idPartida: number;
	nombre: string;
	numeroLetras: number;

	constructor(idPartida: number, nombre: string, numeroLetras: number) {
		this.idPartida = idPartida;
		this.nombre = nombre;
		this.numeroLetras = numeroLetras;
		this.jugadores = [];
	}

	esPartidaLlena(): boolean {
		return this.jugadores.length >= 2;
	}

	addJugador(jugador: JugadorConectado): void {
		if (!this.esPartidaLlena()) {
			if (!this.jugadores.find((x) => x.idSesion === jugador.idSesion)) {
				this.jugadores.push(jugador);
			}
		}
		}

		esPartidaVacia(): Boolean {
			return this.jugadores.length === 0;
		}

		eliminarJugador(jugador: JugadorConectado): void {
			if(!this.esPartidaVacia()) {
			this.jugadores = this.jugadores.filter((x) => x.idSesion !== jugador.idSesion);
		}
	}
	esPartidaLibre(): boolean {
		return this.jugadores.length < 2;
	}

}
