import { useEffect, useRef } from 'react';
import { h1Registro, tituloRegistro } from '../../variables';
import { SignUpForm } from './SignUpForm';
import { Link } from 'react-router-dom';

export const RegistroPage = () => {
	useEffect(() => {
		document.title = tituloRegistro;
	});
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	},[]);
	return (
		<>
			<h1 ref={h1Ref} tabIndex={-1}>{h1Registro}</h1>
			<div className="row">
				
				<div className="col">
					<SignUpForm />
				</div>
			</div>
			<p>
				¿Ya está registrado? <Link to="/login">Inicie sesión</Link>
			</p>
		</>
	);
};
