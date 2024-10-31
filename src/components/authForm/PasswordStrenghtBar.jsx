// components/PasswordStrengthBar.js
import React from "react";
import style from "./PasswordStrenghtBar.module.css";

const PasswordStrengthBar = ({ strength }) => {
  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
        return "Muy débil";
      case 1:
        return "Débil";
      case 2:
        return "Moderada";
      case 3:
        return "Fuerte";
      case 4:
        return "Muy fuerte";
      default:
        return "Invalida";
    }
  };

  return (
    <div className={style.strengthContainer}>
      <div
        className={style.strengthBar}
        style={{
          width: `${(strength + 1) * 20}%`,
          backgroundColor: getStrengthColor(strength),
        }} // Color dependiendo de la fuerza
      />
      <span>{getStrengthLabel(strength)}</span>
    </div>
  );
};

const getStrengthColor = (strength) => {
  switch (strength) {
    case 0:
      return "red";
    case 1:
      return "orange";
    case 2:
      return "yellow";
    case 3:
      return "lightgreen";
    case 4:
      return "green";
    default:
      return "transparent";
  }
};

export default PasswordStrengthBar;
