export interface ISignIn {
	email: string;
	password: string;
}

export interface ISignUp {
	email: string;
	password: string;
	password2: string;
}

export interface ILoginResponse {
	email: string;
	token: string;
}
