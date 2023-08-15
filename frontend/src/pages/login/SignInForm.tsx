import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { ILoginResponse, ISignIn } from '../../interfaces/login.interface';
import { ILocalStorageInfo } from '../../interfaces/localStorageInfo.interface';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IJugadorInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { clienteAxios } from '../../config/clienteAxios';

export const SignInForm = () => {
  const { setJugadorInfo: setUsuarioInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { form, onInputChange } = useForm<ISignIn>({
    email: '',
    password: ''
  });

  const { email, password } = form;

  const login = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg('');
      const { data } = await clienteAxios.post<ILoginResponse>('/auth/login', { email, password });
      const infoUsuarioStorage: ILocalStorageInfo = {
        email: data.email,
        token: data.token
      };
      localStorage.setItem('usuarioInfo', JSON.stringify(infoUsuarioStorage));
      setUsuarioInfo({ email: data.email, socket: undefined });
      setLoading(false);
      navigate('/chat', {
        replace: true
      });
    } catch (error) {
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <hr />

      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="form-control" value={email} onChange={onInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={onInputChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit" disabled={email.trim() === '' || password.trim() === ''}>
          Iniciar sesión
        </button>
      </form>
      {loading && (
        <div className="alert alert-warning" role="alert">
          Autenticando...
        </div>
      )}
      {/* Si errorFetch es true, mostramos un mensaje de error al usuario */}
      {errorMsg && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};
