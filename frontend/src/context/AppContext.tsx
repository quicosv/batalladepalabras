// El context es un espacio para uso común de elementos de la aplicación. En este ejemplo, la información del usuario (usuarioInfo) es la que
// va formar parte de este espacio
import { createContext } from 'react';
import { IJugadorInfo, IJugadorInfoContext } from '../interfaces/context.interface';

// Comenzamos con un jugador vacío
const jugadorInfo: IJugadorInfo = {
  email: '',
  socket: undefined
};

// Creamos el objeto que va a formar parte del context
const jugadorInfoContext: IJugadorInfoContext = {
  jugadorInfo: jugadorInfo,
  setJugadorInfo: () => null
};

// Y aquí creamos el context
export const AppContext = createContext<IJugadorInfoContext>(jugadorInfoContext);
