import React from "react";
import style from "../header/Header.module.css";

const Header = ({ onLoginClick }) => {
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
              <button className={style.buttonStyle} onClick={onLoginClick}>
                Iniciar Sesión
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
