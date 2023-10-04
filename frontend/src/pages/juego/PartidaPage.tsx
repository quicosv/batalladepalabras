import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { aplicacion, h1Partida } from '../../variables';
import { useForm } from '../../hooks/useForm';
import { ILetra } from '../../interfaces/letra.interface';
import { esAcentuada, letraSinAcentos, palabraSinAcentos } from '../../hooks/useLetra';
import { useParams } from 'react-router-dom';
import { IJugadorInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { IPartida } from '../../interfaces/partida.interface';

export const PartidaPage = () => {
  const { jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
  const [contrincante, setContrincante] = useState<string>('');
  const [hasGanado, setHasGanado] = useState<boolean>(false);
  const [hasPerdido, setHasPerdido] = useState<boolean>(false);
  const [palabra, setPalabra] = useState<string>('');
  const [idPartida, setIdPartida] = useState<number>(0);
  const [descubierto, setDescubierto] = useState<string>('');
  const [letrasProbadas, setLetrasProbadas] = useState<string[]>([]);
  const { form, onInputChange, onResetForm } = useForm<ILetra>({
    letraInput: ''
  });
  const { socket } = jugadorInfo;
  const { nombre } = useParams();

  const { letraInput } = form;

  useEffect(() => {
    socket?.on('comienza-juego', (partida: IPartida) => {
      console.log('partida iniciada', partida);
      setIdPartida(partida.idPartida!);
      const contrincante = partida.jugadores!.find((x) => x.email !== jugadorInfo.email)!;
      setContrincante(contrincante.email);
      if (partida.palabraActual !== '') {
        setPalabra(partida.palabraActual);
        setDescubierto(partida.palabraActual.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '_'));
        console.log('Tienes que adivinar la palabra ' + partida.palabraActual + '.');
      }
    });
  }, []);

  socket?.on('has-ganado', () => {
    setHasGanado(true);
  });

  socket?.on('has-perdido', () => {
    setHasPerdido(true);
  });

  const actualizarDescubierto = (letra: string): void => {
    setPalabra((prevPalabra) => {
      const procesarPalabra: string[] = [...prevPalabra];
      const procesarDescubierto: string[] = [...descubierto];
      const indices: number[] = [];
      const caracteres: string[] = [];
      for (let i = 0; i < procesarDescubierto.length; i++) {
        caracteres.push(procesarDescubierto[i]);
      }

      for (let i = 0; i < procesarDescubierto.length; i++) {
        for (let j = 0; j < procesarPalabra.length; j++) {
          if (esAcentuada(letra) || esAcentuada(procesarPalabra[j].toLowerCase())) {
            if (letraSinAcentos(letra) === letraSinAcentos(procesarPalabra[j])) {
              indices.push(j);
            }
          } else {
            if (letra === procesarPalabra[j]) {
              indices.push(j);
            }
          }
        }
      }

      indices.forEach((x) => {
        caracteres[x] = procesarPalabra[x];
      });

      setDescubierto(caracteres.join(''));
      return prevPalabra;
    });
  };

  const pruebaLetra = (e: FormEvent) => {
    e.preventDefault();
    const letra = letraInput.toLocaleLowerCase();
    setLetrasProbadas([...letrasProbadas, letra.toLocaleLowerCase()]);
    if (palabraSinAcentos(palabra).includes(letra) || palabra.includes(letra)) {
      actualizarDescubierto(letra);
    } else {
      setHasPerdido(false);
    }
    onResetForm();
  };

  useEffect(() => {
    document.title = `${h1Partida} ${nombre} - ${aplicacion}`;
    socket?.emit('crear-partida', {
      nombre,
      numeroLetras: 0,
      email: jugadorInfo.email
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (descubierto === palabra && descubierto !== '') {
      setHasGanado(true);
      socket?.emit('notificar-has-perdido', { email: jugadorInfo.email, idPartida });
    }
  }, [descubierto]);

  return (
    <>
      <h1>{h1Partida}</h1>
      <p className="fs-4 text-primary">
        {contrincante === '' ? 'Esperando a tu oponente' : 'Tu oponente es: ' + contrincante}
      </p>
      {hasGanado && <p className="fs-4 text-success">Has ganado!!!</p>}
      {hasPerdido && <p className="fs-4 text-danger">Has perdido!!! La palabra era: {palabra}</p>}
      {contrincante !== '' && !hasGanado && !hasPerdido ? (
        <>
          <form className="row g-3" onSubmit={pruebaLetra}>
            <div className="form-group">
              <label className="form-label" htmlFor="letra">
                Letra
              </label>
              <input
                className="form-control"
                type="text"
                maxLength={1}
                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1}"
                id="letraInput"
                value={letraInput}
                onChange={onInputChange}
                ref={inputRef}
                required
              />
            </div>
            <button className="btn btn-success btn-lg" type="submit">
              Probar
            </button>
          </form>
          <h2>Estado de la palabra</h2>
          <p aria-hidden="true">{descubierto}</p>
          <ol className="oculto-visualmente">
            {[...descubierto].map((x, i) => (
              <li key={i}>{x === '_' ? 'Desconocida.' : `${x}.`}</li>
            ))}
          </ol>
          {descubierto === palabra && <p>Has ganado.</p>}
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};
