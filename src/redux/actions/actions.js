// src/redux/actions/actions.js
import axios from "axios";
import { FETCH_STICKERS_SUCCESS } from "../actions-types/actionTypes"; // Importa los action types

export function fetchStickers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3000/stickers");
      const stickers = response.data;
      dispatch({
        type: FETCH_STICKERS_SUCCESS,
        payload: stickers,
      });
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    }
  };
}
