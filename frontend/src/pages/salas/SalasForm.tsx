import { FormEvent, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { ISala } from '../../interfaces/sala.interface';
import { clienteAxios } from '../../config/clienteAxios';

interface ISalasFormProps {
  setRefreshSalas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SalasForm = ({ setRefreshSalas }: ISalasFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);
  const { form, onInputChange, onResetForm } = useForm<ISala>({
    nombre: ''
  });

  const { nombre } = form;

  const crearSala = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<ISala>('/salas', { nombre });
      onResetForm();
      setOk(true);
      setLoading(false);
      setRefreshSalas(true);
    } catch (error) {
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <h1>Crear sala</h1>
      <hr />

      <form onSubmit={crearSala}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la sala</label>
          <input id="nombre" type="text" className="form-control" value={nombre} onChange={onInputChange} required />
        </div>
        {nombre === '' && (
          <div className="alert alert-danger" role="alert">
            El nombre de la sala es obligatorio
          </div>
        )}
        <button className="btn btn-primary" type="submit" disabled={nombre.trim() === ''}>
          Crear sala
        </button>
      </form>
      {loading && (
        <div className="alert alert-warning" role="alert">
          Creando sala ...
        </div>
      )}
      {!ok && errorMsg && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};
