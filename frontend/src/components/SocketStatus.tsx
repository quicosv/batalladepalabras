interface ISocketStatusProps {
  online: boolean;
}

export const SocketStatus = ({ online }: ISocketStatusProps) => {
  return (
    <>
      <div className="alert">
        <p>
          Service status:
          {online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>}
        </p>
      </div>
    </>
  );
};
