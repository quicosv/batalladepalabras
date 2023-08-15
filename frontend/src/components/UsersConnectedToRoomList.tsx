import { IUsuarioConectado } from '../interfaces/usuarioConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

interface IUsersConnectedToRoom {
  sala: string;
}

export const UsersConnectedToRoomList = ({ sala }: IUsersConnectedToRoom) => {
  const { jugadorInfo: usuarioInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [usuariosConectados, setUsuariosConectados] = useState<IUsuarioConectado[]>([]);

  const { socket } = usuarioInfo;
  socket?.on(`usuarios-conectados-a-sala`, (usuariosConectados: IUsuarioConectado[]) => {
    setUsuariosConectados(usuariosConectados);
  });

  const enviarPrivado = (e: IUsuarioConectado) => {
    const privado = prompt('Introduce mensaje');
    socket?.emit('mensaje-privado', { from: usuarioInfo.email, to: e.idSesion, texto: privado });
  };

  return (
    <>
      <h2>Usuarios conectados a la sala {sala}</h2>
      <ul className="list-group">
        {usuariosConectados.map((x) => (
          <li className="list-group-item" key={x.idSesion}>
            {x.email}
            {usuarioInfo.email !== x.email && (
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
