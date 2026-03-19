/**
 * Pide una carta
 * @param {Array<String>} deck 
 * @returns {Array<String>}
 */
export const pedirCarta = (deck) => {
    if (deck.length === 0) throw "No hay cartas en el deck";

    return deck.pop();
  };