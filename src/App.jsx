import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Catalogo from "./components/catalogo/Catalogo";
import AuthForm from "./components/authForm/AuthForm";
import Dashboard from "./components/dashboard/Dashboard";
import { setUser } from "./redux/actions/actions"; // Asegúrate de tener una acción para establecer el usuario
import { useDispatch, useSelector } from "react-redux"; // Importar useSelector
import React, { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  // Obtener el usuario del estado global
  const user = useSelector((state) => state.user); // Asumiendo que tu estado de usuario está en user

  useEffect(() => {
    // Recuperar datos del usuario del local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(setUser(JSON.parse(userData))); // Despachar acción para establecer el usuario en el estado
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/dashboard/*" element={<Dashboard user={user} />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
