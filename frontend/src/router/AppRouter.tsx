import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/login/LoginPage';
import { PagesLayout } from '../layouts/PagesLayout';
import { SalasPage } from '../pages/salas/SalasPage';
import { ChatPage } from '../pages/chat/ChatPage';
import { useContext, useEffect, useState } from 'react';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';
import { IJugadorInfoContext } from '../interfaces/context.interface';
import { AppContext } from '../context/AppContext';

export const AppRouter = () => {
  const { setJugadorInfo: setUsuarioInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
    if (infoStorage) {
      setUsuarioInfo({ email: infoStorage.email, socket: undefined });
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
          </Route>

          <Route path="/chat" element={<PagesLayout />}>
            <Route index element={<SalasPage />} />
            <Route path="/chat/:idSala/:nombre" element={<ChatPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
