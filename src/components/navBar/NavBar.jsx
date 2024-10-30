import React from "react";

const navbarStyle = {
  display: "flex",
  flexDirection: "column", // Apilar en pantallas pequeñas
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
};

const socialMediaStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
};

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "#007bff",
};

const searchBarStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
};

const inputStyle = {
  width: "80%",
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const navButtonsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
};

const buttonStyle = {
  marginLeft: "10px",
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

const NavBar = () => {
  return (
    <div>
      <nav style={navbarStyle}>
        <div style={socialMediaStyle}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            WhatsApp
          </a>
        </div>

        <div style={searchBarStyle}>
          <input
            type="text"
            placeholder="Buscar stickers..."
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Buscar
          </button>
        </div>

        <div style={navButtonsStyle}>
          <button style={buttonStyle}>Carrito</button>
          <button style={buttonStyle}>Iniciar Sesión</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
