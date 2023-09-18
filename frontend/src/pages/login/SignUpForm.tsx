import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ILoginResponse, ISignUp } from "../../interfaces/login.interface";
import { ILocalStorageInfo } from "../../interfaces/localStorageInfo.interface";
import { handlerAxiosError } from "../../helpers/handlerAxiosError";
import { clienteAxios } from "../../config/clienteAxios";
import { IJugadorInfoContext } from "../../interfaces/context.interface";
import { AppContext } from "../../context/AppContext";

export const SignUpForm = () => {
	const { setJugadorInfo: setJugadorInfo } =
		useContext<IJugadorInfoContext>(AppContext);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { form, onInputChange } = useForm<ISignUp>({
		email: "",
		password: "",
		password2: "",
	});

	const { email, password, password2 } = form;

	const singUp = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg("");
			const { data } = await clienteAxios.post<ILoginResponse>("/jugadores", {
				email,
				password,
			});
			const infoJugadorStorage: ILocalStorageInfo = {
				email: data.email,
				token: data.token,
			};
			localStorage.setItem("jugadorInfo", JSON.stringify(infoJugadorStorage));
			setJugadorInfo({ email: data.email, socket: undefined });
			setLoading(false);
			navigate("/partidasactivas", {
				replace: true,
			});
		} catch (error) {
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};
	const loginRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (loginRef.current) {
			loginRef.current.focus();
		}
	}, []);

	return (
		<>
			<form onSubmit={singUp}>
				<div className="form-group">
					<label htmlFor="email">Correo electrónico</label>
					<input
						id="email"
						type="email"
						ref={loginRef}
						className="form-control"
						value={email}
						onChange={onInputChange}
						title="Este coreo actuará como su nombre de jugador."
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input
						id="password"
						type="password"
						className="form-control"
						value={password}
						onChange={onInputChange}
						title="Debe tener un mínimo de 6 caracteres."
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirmar contraseña</label>
					<input
						id="password2"
						type="password"
						className="form-control"
						value={password2}
						onChange={onInputChange}
						title="Debe coincidir con la que ha escrito en el campo anterior."
						required
					/>
				</div>
				{password !== password2 && (
					<div className="alert alert-danger" role="alert">
						Las contraseñas no coinciden
					</div>
				)}
				<button className="btn btn-primary" type="submit">
					Crear cuenta
				</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Creando cuenta ...
				</div>
			)}
			{/* Si errorFetch es true, mostramos un mensaje de error al jugador */}
			{errorMsg && !loading && (
				<div className="alert alert-danger" role="alert">
					{errorMsg}
				</div>
			)}
		</>
	);
};
