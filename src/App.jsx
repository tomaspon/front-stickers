import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Catalogo from "./components/catalogo/Catalogo";
import AuthForm from "./components/authForm/AuthForm";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/auth" element={<AuthForm />} />{" "}
            {/* Ruta para login/registro */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
