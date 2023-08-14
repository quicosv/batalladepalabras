import React from 'react';
import ReactDOM from 'react-dom/client';
import { Ahorcado } from './Ahorcado';

import 'bootstrap/dist/css/bootstrap.css';
import { PalabrasProporcionadas } from './PalabrasProporcionadas';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	      <PalabrasProporcionadas>
        {(palabraProporcionada) => <Ahorcado palabraProporcionada={palabraProporcionada} />}
      </PalabrasProporcionadas>
  </React.StrictMode>
);
