import { Socket } from 'socket.io-client';

export interface IJugadorInfo {
	email: string;
	socket: Socket | undefined;
}

export interface IJugadorInfoContext {
	jugadorInfo: IJugadorInfo;
	setJugadorInfo: (jugadorInfo: IJugadorInfo) => void;
}
