import React, { useEffect, useState } from "react"; // Importa useEffect y useState
import style from "../header/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/actions";

const Header = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const [userInLocalStorage, setUserInLocalStorage] = useState(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload(); // Recarga la página
  };

  useEffect(() => {
    // Verifica si hay un usuario en el local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserInLocalStorage(JSON.parse(userData));
      console.log(
        "Usuario recuperado del local storage:",
        JSON.parse(userData)
      );
    } else {
      console.log("No hay usuario en local storage.");
    }
  }, []);

  return (
    <div>
      <header>
        <div>
          <div>
            <p>Descubre nuestros stickers únicos para personalizar tu mundo</p>
          </div>
          <div>
            <a href="http://localhost:5173/">
              <h1>Tolu Stickers</h1>
            </a>
          </div>
        </div>
        <div>
          <nav className={style.navbarStyle}>
            <div className={style.socialMediaStyle}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkStyle}
              >
                Instagram
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkStyle}
              >
                WhatsApp
              </a>
            </div>

            <div className={style.searchBarStyle}>
              <input
                type="text"
                placeholder="Buscar stickers..."
                className={style.inputStyle}
              />
              <button type="submit" className={style.buttonStyle}>
                Buscar
              </button>
            </div>

            <div className={style.navButtonsStyle}>
              <button className={style.buttonStyle}>Carrito</button>
              {userInLocalStorage ? (
                <button className={style.buttonStyle} onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              ) : (
                <button className={style.buttonStyle} onClick={onLoginClick}>
                  Iniciar Sesión
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
