import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ILoginResponse, ISignIn } from "../../interfaces/login.interface";
import { ILocalStorageInfo } from "../../interfaces/localStorageInfo.interface";
import { handlerAxiosError } from "../../helpers/handlerAxiosError";
import { IJugadorInfoContext } from "../../interfaces/context.interface";
import { AppContext } from "../../context/AppContext";
import { clienteAxios } from "../../config/clienteAxios";

export const SignInForm = () => {
	const { setJugadorInfo: setJugadorInfo } =
		useContext<IJugadorInfoContext>(AppContext);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { form, onInputChange } = useForm<ISignIn>({
		email: "",
		password: "",
	});

	const { email, password } = form;

	const login = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg("");
			const { data } = await clienteAxios.post<ILoginResponse>("/auth/login", {
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
	  },[]);

	return (
		<>
			<form className="row g-3" onSubmit={login}>
				<div className="form-group col-6">
					<label className="form-label" htmlFor="email">Correo electrónico</label>
					<input
						id="email"
						type="email"
						ref={loginRef} 
						className="form-control"
						value={email}
						onChange={onInputChange}
						title="El correo que utilizó para registrarse."
						required
					/>
				</div>
				<div className="form-group col-6">
					<label className="form-label" htmlFor="password">Contraseña</label>
					<input
						id="password"
						type="password"
						className="form-control"
						value={password}
						onChange={onInputChange}
						title="El sistema distingue entre mayúsculas y minúsculas."
						required
					/>
				</div>
				<button className="btn btn-success btn-lg" type="submit">
					Iniciar sesión
				</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Autenticando...
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
