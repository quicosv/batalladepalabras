import { useContext, useState } from 'react';
import { IPartida } from '../../interfaces/partida.interface';
import { AppContext } from '../../context/AppContext';
import { IJugadorInfoContext } from '../../interfaces/context.interface';
import { Link } from 'react-router-dom';

interface IPartidasListProps {
  setRefreshPartidas: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPartidas: boolean;
}

export const PartidasList = ({ refreshPartidas, setRefreshPartidas }: IPartidasListProps) => {
  const { jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [partidas, setPartidas] = useState<IPartida[]>([]);
  const { socket } = jugadorInfo;
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);
  const numeros = Array.from({ length: 23 }, (_, i) => i + 1);

  socket?.on('lista-partidas', (partidas: IPartida[]) => {
    setPartidas(partidas);
    console.log('Lista de partidas actualizada:', partidas); // Añade esta línea
    setRefreshPartidas(false); // Desactiva el refresco después de obtener las partidas
    setLoading(false); // Desactiva la carga después de obtener las partidas
  });

  // const buscaPartidas = (cantidadDeLetras: number): boolean => {
  //   return partidas.some((partida) => partida.numeroLetras === cantidadDeLetras);
  // };

  const generarDireccion = (partida: IPartida): string => {
    return `/partida/${partida.nombre}`;
  };

  const unirAPartida = (partida: IPartida) => {
    socket?.emit('unirse-a-partida', { email: jugadorInfo.email, idPartida: partida.idPartida });
  };

  return (
    <>
      {loading ? (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Esperando partidas...
        </div>
      ) : partidas?.length > 0 ? (
        <ul>
          {partidas
            .filter((partida) => partida.jugadores && partida.jugadores.length === 1)
            .map((x) => (
              <li className="list-group-item" key={x.idPartida}>
                <Link onClick={() => unirAPartida(x)} to={generarDireccion(x)}>
                  {x.nombre}
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        // numeros.map(
        //   (numero) =>
        //     buscaPartidas(numero) && (
        //       <>
        //         <div key={numero}>
        //           <h2>
        //             Partidas de {numero === 1 ? 'una' : numero} letra{numero > 1 ? 's' : ''}
        //           </h2>
        //           <ul className="sin-binietas">
        //             {partidas
        //               .filter((partida) => partida.jugadores && partida.jugadores.length === 1)
        //               .map((x) => (
        //                 <li className="list-group-item" key={x.idPartida}>
        //                   <Link to={generarDireccion(x)}>{x.nombre}</Link>
        //                 </li>
        //               ))}
        //           </ul>
        //         </div>
        //       </>
        //     )
        // )
        <p>Ahora mismo no hay partidas.</p>
      )}
      {!ok &&
        errorMsg &&
        !refreshPartidas &&
        (setErrorMsg('Ha ocurrido un error al actualizar las partidas.'), // Establece un mensaje de error
        setOk(false), // Indica que algo ha ido mal
        setLoading(false), // Desactiva la carga ya que ha ocurrido un error
        (
          <div className="alert alert-danger" role="status" aria-live="polite">
            Ha ocurrido un error al actualizar las partidas.
          </div>
        ))}
    </>
  );
};
