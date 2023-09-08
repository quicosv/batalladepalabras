interface ISocketStatusProps {
	online: boolean;
}

export const SocketStatus = ({ online }: ISocketStatusProps) => {
	return (
		<>
			<div className="alert">
				<p>
					{online ? <span className="text-success">Estás conectado.</span> : <span className="text-danger">No estás conectado.</span>}
				</p>
			</div>
		</>
	);
};
