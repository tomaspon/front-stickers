// reducer.js
import {
  FETCH_STICKERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  // Otras acciones
} from "../actions-types/actionTypes";

export const initialState = {
  loading: false,
  stickers: [], // Aquí almacenas el array directamente
  user: null, // Añade este campo para almacenar la información del usuario
  cart: null, // Añade este campo si necesitas almacenar el carrito
  error: null,
};

const reducer = (state = initialState, action) => {
  console.log("Action received:", action); // Muestra la acción recibida
  console.log("Current state before action:", state); // Muestra el estado actual antes de aplicar la acción

  switch (action.type) {
    case FETCH_STICKERS_SUCCESS:
      console.log("Action received:", action); // Esto debería mostrar solo stickers
      return { ...state, loading: false, stickers: action.payload }; // Esto debe ser solo un array

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user, // Asegúrate de que esto no interfiera con stickers
        cart: action.payload.cart,
        error: null,
      };

    case REGISTER_USER_FAILURE:
      console.log("Registration error:", action.payload); // Muestra el error de registro
      return {
        ...state,
        error: action.payload, // Almacena el error si ocurre un fallo en el registro
      };

    default:
      return state;
  }
};

export default reducer;
