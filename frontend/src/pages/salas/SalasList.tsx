import { useEffect, useState } from 'react';
import { ISala } from '../../interfaces/sala.interface';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { useNavigate } from 'react-router-dom';

interface ISalasListProps {
  setRefreshSalas: React.Dispatch<React.SetStateAction<boolean>>;
  refreshSalas: boolean;
}

export const SalasList = ({ refreshSalas, setRefreshSalas }: ISalasListProps) => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState<ISala[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);

  useEffect(() => {
    if (refreshSalas) {
      getSalas();
    }
  }, [refreshSalas]);

  const getSalas = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const { data } = await clienteAxios.get<ISala[]>('/salas');
      setSalas(data);
      setRefreshSalas(false);
      setLoading(false);
      setOk(true);
    } catch (error) {
      setRefreshSalas(false);
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const goToSala = async (sala: ISala) => {
    const url = `/chat/${sala.idSala}/${sala.nombre}`;
    navigate(url);
  };

  return (
    <>
      {salas?.length > 0 && (
        <>
          <h2>Total salas: {salas.length}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salas.map((x) => (
                <tr key={x.idSala}>
                  <td>{x.nombre}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => goToSala(x)}>
                      Entrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {refreshSalas && loading && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando salas...
        </div>
      )}
      {!ok && errorMsg && !refreshSalas && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};
