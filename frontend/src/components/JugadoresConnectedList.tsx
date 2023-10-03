import { IJugadorConectado } from '../interfaces/jugadorConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

export const UsersConnectedList = () => {
  const { jugadorInfo: jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [jugadoresConectados, setJugadoresConectados] = useState<IJugadorConectado[]>([]);
  const { socket } = jugadorInfo;
  socket?.on('jugadores-conectados', (jugadoresConectados: IJugadorConectado[]) => {
    console.log(jugadoresConectados);
    setJugadoresConectados(jugadoresConectados);
  });

  return (
    <>
      <h2>Jugadores conectados</h2>
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
