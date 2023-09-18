import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/login/LoginPage';
import { PagesLayout } from '../layouts/PagesLayout';
import { useContext, useEffect, useState } from 'react';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';
import { AppContext } from '../context/AppContext';
import { RegistroPage } from '../pages/login/RegistroPage';
import { IJugadorInfoContext } from '../interfaces/context.interface';
import { PartidaPage } from '../pages/juego/PartidaPage';
import { PartidasActivasPage } from '../pages/partidas/PartidasActivasPage';
import { CrearPartidasPage } from '../pages/partidas/CrearPartidasPage';

export const AppRouter = () => {
	const { setJugadorInfo: setJugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('jugadorInfo')!);
		if (infoStorage) {
			setJugadorInfo({ email: infoStorage.email, socket: undefined });
		}
		setLoading(false);
	}, []);

	return (
		<>
			{!loading && (
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<LoginPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path='/registro' element={<RegistroPage />} />
					</Route>


					<Route path="/" element={<PagesLayout />}>
						<Route index element={<PartidasActivasPage />} />
						<Route path='/partidasactivas' element={<PartidasActivasPage />} />
						<Route path='/crearpartida' element={<CrearPartidasPage />} />
			<Route path="/partida/:idPartida/:nombre" element={<PartidaPage  />} />
					</Route>
				</Routes>
			)}
		</>
	);
};
