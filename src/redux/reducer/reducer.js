// reducer.js
import {
  FETCH_STICKERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SET_USER,
  GET_ALL_USERS,
  DELETE_STICKERS_SUCCESS,
  DELETE_STICKERS_FAILURE, // Otras acciones
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  CREATE_STICKER_SUCCESS,
  CREATE_STICKER_FAILURE,
  UPDATE_STICKER_SUCCESS,
  UPDATE_STICKER_FAILURE,
} from "../actions-types/actionTypes";

export const initialState = {
  loading: false,
  users: [],
  stickers: [], // Aquí almacenas el array directamente
  user: null, // Almacena la información del usuario autenticado
  cart: null, // Almacena el carrito si es necesario
  error: null, // Almacena errores
  isAuthenticated: false, // Indica si el usuario está autenticado
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

    case LOGIN_SUCCESS:
      console.log("Inicio de sesión exitoso:", action.payload); // Log de éxito

      return {
        ...state,
        user: action.payload, // Almacena los datos del usuario autenticado
        isAuthenticated: true, // Marca el usuario como autenticado
        error: null, // Limpia cualquier error previo
      };

    case LOGIN_FAILURE:
      console.log("Error en el inicio de sesión:", action.payload); // Log de error

      return {
        ...state,
        error: action.payload, // Almacena el mensaje de error
        isAuthenticated: false, // Marca el usuario como no autenticado
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null, // Limpia los datos del usuario
        isAuthenticated: false, // Marca como no autenticado
        error: null,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload, // Asegúrate de que `payload` contenga un array
      };

    case DELETE_STICKERS_SUCCESS:
      return {
        ...state,
        stickers: state.stickers.filter(
          (sticker) => !action.payload.includes(sticker.id) // Filtra los stickers que se eliminaron
        ),
      };

    case DELETE_STICKERS_FAILURE:
      // Maneja el error de eliminación si es necesario
      return {
        ...state,
        error: action.payload, // Almacena el mensaje de error
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_STICKER_SUCCESS:
      return {
        ...state,
        stickers: [...state.stickers, action.payload], // Agrega el nuevo sticker a la lista
        error: null,
      };
    case CREATE_STICKER_FAILURE:
      return {
        ...state,
        error: action.payload, // Guarda el error en el estado
      };

    case UPDATE_STICKER_SUCCESS:
      return {
        ...state,
        loading: false,
        // Actualiza el sticker en el estado
        stickers: state.stickers.map((sticker) =>
          sticker.id === action.payload.id ? action.payload : sticker
        ),
      };
    case UPDATE_STICKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
