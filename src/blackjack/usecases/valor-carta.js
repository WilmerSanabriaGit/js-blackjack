
/**
 * 
 * @param {String} carta 
 * @returns {Number}
 */
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    let puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

    return puntos;
  };
