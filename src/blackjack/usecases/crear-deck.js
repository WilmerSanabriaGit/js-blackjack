import _ from 'underscore';
//crea un nuevo deck

/**
 * Crea un nuevo deck
 * @param {Array<String>} tiposCarta  Example ["C", "D", "H", "S"]
 * @param {Array<String>} tipoEspeciales  Example ["A", "J", "Q", "K"]
 * @returns {Array<String>} 
 */
const crearDeck = (tiposCarta, tipoEspeciales) => {

    if (!tiposCarta || tiposCarta.length === 0) throw new Error('tiposCarta es obligatorio');
    if (!tipoEspeciales || tipoEspeciales.length === 0) throw new Error('tipoEspeciales es obligatorio');

    let deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tiposCarta) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tiposCarta) {
      for (let esp of tipoEspeciales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

export { crearDeck };