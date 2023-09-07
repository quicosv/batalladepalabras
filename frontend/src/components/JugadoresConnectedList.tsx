import { IJugadorConectado } from '../interfaces/jugadorConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

export const UsersConnectedList = () => {
  const { jugadorInfo: usuarioInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [jugadoresConectados, setJugadoresConectados] = useState<IJugadorConectado[]>([]);
  const { socket } = usuarioInfo;
  socket?.on('jugadores-conectados', (jugadoresConectados: IJugadorConectado[]) => {
    setJugadoresConectados(jugadoresConectados);
  });

  return (
    <>
      <h2>Usuarios conectados</h2>
      <ul className="list-group">
        {jugadoresConectados.map((x) => (
          <li className="list-group-item" key={x.idSesion}>
            {x.email}
          </li>
        ))}
      </ul>
    </>
  );
};
