import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IJugadorInfoContext } from '../interfaces/context.interface';

export const LogoutButton = () => {
	const { jugadorInfo: jugadorInfo, setJugadorInfo: setJugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
	const { socket } = jugadorInfo;
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('jugadorInfo');
		socket?.disconnect();
		setJugadorInfo({ email: '', socket: undefined });
		navigate('/', {
			replace: true
		});
	};

	return (
		<>
			<button className="btn btn-warning" onClick={logout}>
				Cerrar sesión de {jugadorInfo.email}
			</button>
		</>
	);
};
