import axios from "axios";
import {
  FETCH_STICKERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_USER,
  GET_ALL_USERS,
  DELETE_STICKERS_SUCCESS,
  DELETE_STICKERS_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  CREATE_STICKER_SUCCESS,
  CREATE_STICKER_FAILURE,
  UPDATE_STICKER_SUCCESS,
  UPDATE_STICKER_FAILURE,
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

export const updateSticker = (id, stickerData) => async (dispatch) => {
  console.log("Datos enviados para actualizar el sticker:", stickerData); // Imprime lo que envías

  try {
    const response = await axios.put(
      `http://localhost:3000/stickers/${id}`,
      stickerData
    );
    console.log(
      "Respuesta del servidor al actualizar el sticker:",
      response.data
    ); // Imprime la respuesta del servidor

    dispatch({
      type: UPDATE_STICKER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error en la acción de actualización:", error.message);
    dispatch({
      type: UPDATE_STICKER_FAILURE,
      payload: error.message,
    });
    throw error; // Lanza el error para que pueda ser capturado en el componente
  }
};

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
// actions.js
export const loginUser = (userData) => async (dispatch) => {
  try {
    console.log("Intentando iniciar sesión con:", userData); // Log para las credenciales

    const response = await axios.post(
      "http://localhost:3000/users/login",
      userData
    );
    console.log("Respuesta del servidor:", response.data); // Log para la respuesta del servidor

    // credentials debe ser { email, password }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    console.log("Acción de éxito despachada con datos:", response.data); // Log para la acción de éxito

    return response; // Devuelve la respuesta para manejarla en el componente
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    throw error; // Lanzar el error para manejarlo en el componente
  }
};

export const logoutUser = () => (dispatch) => {
  // Limpiar el local storage si es necesario
  localStorage.removeItem("user");

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/users"); // Cambia esta URL según sea necesario
      console.log("Datos de usuarios recibidos:", response.data);

      dispatch({
        type: GET_ALL_USERS,
        payload: response.data, // Asegúrate de que esto sea un array de usuarios
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      // Puedes manejar el error como desees, por ejemplo, despachar una acción de error.
    }
  };
};

// src/redux/actions/actions.js
export const deleteStickers = (stickerIds) => {
  return async (dispatch) => {
    try {
      console.log("Stickers RECIBIDOS:", stickerIds); // Log para los stickers eliminados
      // Realiza la solicitud DELETE al backend usando Axios
      const response = await axios.delete(`http://localhost:3000/stickers`, {
        data: { ids: stickerIds }, // Envía los IDs de los stickers a eliminar en el cuerpo
      });

      console.log("Stickers eliminados:", stickerIds); // Log para los stickers eliminados

      // Dispatch de la acción de éxito
      dispatch({
        type: DELETE_STICKERS_SUCCESS,
        payload: { ids: stickerIds, message: response.data.message }, // Envía los IDs eliminados y el mensaje
      });
    } catch (error) {
      console.error("Error al eliminar stickers:", error); // Log para el error
      dispatch({
        type: DELETE_STICKERS_FAILURE,
        payload: error.response ? error.response.data : error.message, // Manejo de errores
      });
    }
  };
};

// actions.j

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, {
        newName: userData.name,
        newLastname: userData.lastname,
        newEmail: userData.email,
        newPassword: userData.password,
        newImg: userData.image,
        newStatus: userData.status,
      });

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data.user, // Suponiendo que el backend devuelve el usuario actualizado
      });

      // Puedes también manejar el estado de error o el estado de carga aquí si es necesario
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response
          ? error.response.data.message
          : "Error al actualizar el usuario",
      });
    }
  };
};

export const createSticker = (stickerData) => {
  return async (dispatch) => {
    try {
      console.log(
        "Intentando crear un nuevo sticker con los siguientes datos:",
        stickerData
      );

      // Crea un sticker usando el API
      const response = await axios.post(
        "http://localhost:3000/stickers",
        stickerData
      );
      console.log("Respuesta de la creación del sticker:", response);

      // Si la respuesta es exitosa, despachamos la acción de éxito
      dispatch({
        type: CREATE_STICKER_SUCCESS,
        payload: response.data,
      });
      console.log(
        "Sticker creado correctamente y dispatch realizado con payload:",
        response.data
      );
    } catch (error) {
      // En caso de error, despachamos la acción de fallo
      console.error("Error al crear sticker:", error.message);
      dispatch({
        type: CREATE_STICKER_FAILURE,
        payload: error.message,
      });
    }
  };
};
