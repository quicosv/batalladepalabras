import { Outlet } from 'react-router-dom';
import { aplicacion } from '../variables';

export const AuthLayout = () => {
	return (
		<>
		<header>
			<h1>{aplicacion}</h1>
		</header>
			<main className="container">
				<Outlet />
			</main>
		</>
	);
};
