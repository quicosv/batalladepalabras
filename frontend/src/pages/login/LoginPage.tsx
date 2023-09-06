import { Link } from 'react-router-dom';
import { SignInForm } from './SignInForm';
import { h1Login, tituloLogin } from '../../variables';
import { useEffect } from 'react';

export const LoginPage = () => {
  useEffect(() => {
    document.title = tituloLogin;
  }, []);
  return (
    <>
      <h1>{h1Login}</h1>
      <div className="row">
        <div className="col">
          <SignInForm />
        </div>
        
      </div>
	  <p>
        ¿No tiene cuenta?{' '}
        <Link to="/registro">Regístrese</Link>
      </p>
    </>
  );
};
