import { Link } from 'react-router-dom';
import { SignInForm } from './SignInForm';

export const LoginPage = () => {
  return (
    <>
      <h1>Batalla de palabras</h1>
      <hr />
      <div className="row">
        <div className="col">
          <SignInForm />
        </div>
        
      </div>
	  <p>
        ¿No tiene cuenta?{' '}
        <Link to="/register">Regístrese</Link>
      </p>
    </>
  );
};
