import { ReactNode, useState } from 'react';
import { AppContext } from './AppContext';
import { IJugadorInfo } from '../interfaces/context.interface';

// Este provider prepara a todos sus hijos, que serán todos los componentes que estén dentro suyo, para comunicarse con el context
// los hijos (children) son todos los Functional components que estarán dentro del provider (React.FC). Cada uno de ellos es un ReactNode
// Debemos definir esta interface para determinar el tipo de los hijos del provider
interface IPropsProvider {
  children?: ReactNode;
}

export const AppProvider: React.FC<IPropsProvider> = ({ children }) => {
  // Este useState controla el estado del user y expone la función que lo cambiará.
  // Son los dos valores que se le pasan al context
  const [usuarioInfo, setUsuarioInfo] = useState<IJugadorInfo>({ email: '', socket: undefined });
  // Y ahora conectamos este provider con el context pasándole los valores que necesita a todos los hijos (children)
  return <AppContext.Provider value={{ jugadorInfo: usuarioInfo, setJugadorInfo: setUsuarioInfo }}>{children}</AppContext.Provider>;
};
