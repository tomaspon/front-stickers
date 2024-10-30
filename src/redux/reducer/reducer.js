// reducer.js
import {
  FETCH_STICKERS_SUCCESS,
  // Otras acciones
} from "../actions-types/actionTypes";

const initialState = {
  loading: false,
  stickers: [], // Aquí almacenas el array directamente
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STICKERS_SUCCESS:
      return { ...state, loading: false, stickers: action.payload }; // action.payload es el array de stickers

    default:
      return state;
  }
};

export default reducer;
