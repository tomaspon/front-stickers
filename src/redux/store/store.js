import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // No debes usar llaves, ya que thunk es una exportación por defecto
import reducer from "../reducer/reducer"; // Asegúrate de que esta ruta sea correcta

// Aplica middleware
const middleware = applyMiddleware(thunk);

// Crea el store con el reducer y el middleware
const store = createStore(reducer, middleware);

export default store;
