import { IJugadorConectado } from '../interfaces/jugadorConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

interface IUsersConnectedToRoom {
	sala: string;
}

export const UsersConnectedToRoomList = ({ sala }: IUsersConnectedToRoom) => {
	const { jugadorInfo: jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
	const [jugadoresConectados, setJugadoresConectados] = useState<IJugadorConectado[]>([]);

	const { socket } = jugadorInfo;
	socket?.on(`jugadores-conectados-a-sala`, (jugadoresConectados: IJugadorConectado[]) => {
		setJugadoresConectados(jugadoresConectados);
	});

	const enviarPrivado = (e: IJugadorConectado) => {
		const privado = prompt('Introduce mensaje');
		socket?.emit('mensaje-privado', { from: jugadorInfo.email, to: e.idSesion, texto: privado });
	};

	return (
		<>
			<h2>Jugadores conectados a la sala {sala}</h2>
			<ul className="list-group">
				{jugadoresConectados.map((x) => (
					<li className="list-group-item" key={x.idSesion}>
						{x.email}
						{jugadorInfo.email !== x.email && (
							<>
								<button className="btn btn-warning" onClick={() => enviarPrivado(x)}>
									Enviar privado
								</button>
							</>
						)}
					</li>
				))}
			</ul>
		</>
	);
};
