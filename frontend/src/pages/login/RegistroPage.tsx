import { useEffect } from 'react';
import { h1Registro, tituloRegistro } from '../../variables';
import { SignUpForm } from './SignUpForm';

export const RegistroPage = () => {
  useEffect(() => {
    document.title = tituloRegistro;
  })
  return (
    <>
      <h1>{h1Registro}</h1>
      <div className="row">
        
        <div className="col">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};
