import { Partida } from "./Partida";

export class partidasLista {
	private partidas: Partida[];
	constructor() {
		this.partidas = [];
	}
	addPartida(nombre: string, numeroLetras: number): void {
// La partida sólo se crea si el nombre no existe.
if (!this.partidas.find((x) => x.nombre === nombre)) {
	const nuevaPartida = new Partida(this.partidas.length + 1, nombre, numeroLetras);
	this.partidas.push(nuevaPartida);
}
	}
	eliminarPartida(id: number): void {
		this.partidas = this.partidas.filter((x) => x.idPartida !== id);
	}
	getPartidas (): Partida[] {
		return this.partidas;
	}
	getPartidasConHuecos (): Partida[] {
		return this.partidas.filter((x) => x.esPartidaLibre());
	}

}