import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { SocketStatus } from "../components/SocketStatus";
import { ILocalStorageInfo } from "../interfaces/localStorageInfo.interface";
import { AppContext } from "../context/AppContext";
import { IJugadorInfoContext } from "../interfaces/context.interface";
import { aplicacion } from "../variables";

export const PagesLayout = () => {
	const { jugadorInfo: jugadorInfo, setJugadorInfo: setJugadorInfo } =
		useContext<IJugadorInfoContext>(AppContext);
	const navigate = useNavigate();
	const location = useLocation();
	const { socket } = jugadorInfo;
	const { nombre } = useParams();

	const [online, setOnline] = useState(false);

	useEffect(() => {
		if (!socket) {
			const info = localStorage.getItem("jugadorInfo");

			if (info) {
				const email = (JSON.parse(info) as ILocalStorageInfo).email;
				const token = (JSON.parse(info) as ILocalStorageInfo).token;

				const queryObject = { email: email, "x-token": token, sala: "" };
				// Este ir es por si al actualizar la página se reconecta a una sala (actualiza chatpage)
				if (location.pathname.includes("chat")) {
					queryObject.sala = nombre || "";
				}

				const newSocket = io(`${import.meta.env.VITE_BACKEND_SOCKET}`, {
					transports: ["websocket"],
					query: queryObject,
					forceNew: true,
				});

				setJugadorInfo({ email, socket: newSocket });
			}
		}
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("connect", () => {
				setOnline(true);
			});
			socket.on("disconnect", () => {
				setOnline(false);
			});
			socket.on("recibir-privado", (data: { mensaje: string }) => {
				alert(data.mensaje);
			});
		}
	}, [socket]);

	useEffect(() => {
		if (!jugadorInfo.email && !location.pathname.includes("login")) {
			navigate("/", {
				replace: true,
			});
		}
	}, [location.pathname]);

	return (
		<>
			<header className="container">
				<div className="row">
					<div className="col-4">
						<h1>{aplicacion}</h1>
					</div>
					<div className="col-4 mt-2">
						<LogoutButton />
					</div>
				</div>
			</header>
			<main className="container">
				<div className="row">
					<div className="col">
						<Outlet />
					</div>
				</div>
			</main>
			<footer>
				<div className="col-4">
					<SocketStatus online={online} />
				</div>
			</footer>
		</>
	);
};
