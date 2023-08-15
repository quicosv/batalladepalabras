import { IUsuarioConectado } from '../interfaces/usuarioConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

export const UsersConnectedList = () => {
  const { jugadorInfo: usuarioInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [usuariosConectados, setUsuariosConectados] = useState<IUsuarioConectado[]>([]);
  const { socket } = usuarioInfo;
  socket?.on('usuarios-conectados', (usuariosConectados: IUsuarioConectado[]) => {
    setUsuariosConectados(usuariosConectados);
  });

  return (
    <>
      <h2>Usuarios conectados</h2>
      <ul className="list-group">
        {usuariosConectados.map((x) => (
          <li className="list-group-item" key={x.idSesion}>
            {x.email}
          </li>
        ))}
      </ul>
    </>
  );
};
