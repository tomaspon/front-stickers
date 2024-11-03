import style from "./Landing.module.css";
import Header from "../header/Header";
import AuthForm from "../authForm/AuthForm";
import React, { useState } from "react";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar el formulario

  const handleLoginClick = () => {
    setShowLogin(true); // Mostrar el formulario de login cuando se haga clic en "Iniciar sesión"
  };

  const closeLogin = () => {
    setShowLogin(false); // Ocultar el formulario de login
  };

  return (
    <div>
      <header>
        <Header onLoginClick={handleLoginClick} />
      </header>
      <div>
        {showLogin && (
          <div className={style.modalOverlay}>
            <div className={style.modalContent}>
              <button onClick={closeLogin} className={style.closeButton}>
                ×
              </button>
              <AuthForm />
            </div>
          </div>
        )}
      </div>

      <section className={style.benefits}>
        <h2>Beneficios</h2>
        <ul>
          <li>Envíos gratis en compras mayores a $10000</li>
          <li>10% de descuento en transferencias bancarias</li>
        </ul>
      </section>
      <section className={style.stickerSection}>
        <a href="http://localhost:5173/catalogo">Ver catálogo</a>
      </section>
    </div>
  );
};

export default Landing;
