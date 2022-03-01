function /* nome da action1 */(data) {
  return { type: /* tipo da action */, payload: data }
}

function /* nome da action2 */() {
  return async (dispatch) => {

    /* ===> despacha action com o erro */

    try {

      /* ===> requisição da API */
      /* ===> despacha action com os dados do personagem */

    } catch (error) {

      /* ===> despacha action com o erro */

    }
  }
}

export default /* nome da action2 */;