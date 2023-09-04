import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import { PalabrasProporcionadas } from './pages/juego/PalabrasProporcionadas';
import { Ahorcado } from './pages/juego/Ahorcado';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	      <PalabrasProporcionadas>
        {(palabraProporcionada) => <Ahorcado palabraProporcionada={palabraProporcionada} />}
      </PalabrasProporcionadas>
  </React.StrictMode>
);
