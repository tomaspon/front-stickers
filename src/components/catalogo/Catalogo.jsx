import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../cards/Cards";
import Header from "../header/Header";
import style from "../catalogo/Catalogo.module.css";
import { fetchStickers } from "../../redux/actions/actions";
import AuthForm from "../authForm/AuthForm"; // Importamos el AuthForm

const Catalogo = () => {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false); // Estado para controlar el formulario
  const stickers = useSelector((state) => state.stickers);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchStickers());
  }, [dispatch]);

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
      <section>
        <h2>Catálogo de Stickers</h2>
        {showLogin && (
          <div className="modal">
            <div className="modal-content">
              <button onClick={closeLogin}>Cerrar</button>
              <AuthForm />
            </div>
          </div>
        )}
        {loading ? (
          <p>Cargando stickers...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Cards stickers={stickers} />
        )}
      </section>
    </div>
  );
};

export default Catalogo;
