import { Link } from 'react-router-dom';
import { SignInForm } from './SignInForm';
import { h1Login, tituloLogin } from '../../variables';
import { useEffect, useRef } from 'react';

export const LoginPage = () => {
	useEffect(() => {
		document.title = tituloLogin;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	},[]);

	return (
		<>
			<h1 ref={h1Ref}>{h1Login}</h1>
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
