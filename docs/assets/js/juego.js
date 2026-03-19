
(()=>{
  'use strict';
  let deck = [];
  const tipos = ["C", "D", "H", "S"], especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //Referencias HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnDetener = document.querySelector("#btnDetener");

  const small = document.querySelectorAll("small");

  const divCartasJugadores = document.querySelectorAll(".divCartas");


  const iniciarJuego = ( numJugadores = 2 ) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    
    small.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
  };


  //crea un nuevo deck
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

  //pedir una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();
  };


  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    let puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

    return puntos;
  };




  const acumularPuntos = ( carta,turno )=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    small[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }


  const crearCarta = (carta, turno)=>{
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  }

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));
    determinarGanador();
  }

  const determinarGanador = () =>{

    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana :(');
      }
      else if (puntosMinimos > 21) {
        alert('Computadora gana');
      } else if (puntosComputadora > 21) {
        alert('Jugador gana');
      }
    }, 100);
  }

  //eventos 

  btnPedir.addEventListener('click',  ()=>{
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn('Perdiste');
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn('21! Genial');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }

  });

  btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  })


  btnNuevo.addEventListener('click', () =>{
    
    iniciarJuego();

  })

  return 
 

})();




