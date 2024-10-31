// utils/validator/validateForm.js

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const maxLength = 40;
  if (email.length > maxLength) {
    return "El email debe tener menos de 40 caracteres";
  }

  return emailRegex.test(email) ? "" : "Correo electrónico no válido.";
};

export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (!hasUpperCase) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }
  if (!hasSpecialChar) {
    return "La contraseña debe contener al menos un carácter especial.";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden.";
  }
  return "";
};

export const validateName = (name) => {
  if (name.length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }
  if (name.length > 20) {
    return "El nombre no puede tener más de 20 caracteres.";
  }
  return "";
};

export const validateLastname = (lastname) => {
  if (lastname.length < 3) {
    return "El apellido debe tener al menos 3 caracteres.";
  }
  if (lastname.length > 20) {
    return "El apellido no puede tener más de 20 caracteres.";
  }
  return "";
};
