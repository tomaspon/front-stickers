// src/redux/actions/actions.js
import axios from "axios";
import {
  FETCH_STICKERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../actions-types/actionTypes"; // Importa los action types

export function fetchStickers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3000/stickers");
      const stickers = response.data; // Asegúrate de que esto sea un array de stickers
      console.log("Fetched stickers:", stickers);
      dispatch({
        type: FETCH_STICKERS_SUCCESS,
        payload: stickers, // Esto debe ser un array de stickers
      });
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    }
  };
}

// src/redux/actions/actions.js
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      console.log("Respuesta del registro:", response.data); // Verifica la respuesta

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data, // Asegúrate de que esto contenga el nuevo usuario y el carrito
      });
      return response.data; // Devuelve la respuesta para manejarla en el componente
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
      throw error; // Lanza el error para manejarlo en el componente
    }
  };
};
