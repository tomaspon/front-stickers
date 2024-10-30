import React, { useState } from "react"; // Asegúrate de importar useState

const AuthForm = () => {
  // Estado para alternar entre login y registro
  const [isRegister, setIsRegister] = useState(false);

  // Estado para los datos del formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Lógica de registro
      if (form.password !== form.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      console.log("Datos de registro:", form);
      // Aquí harías la llamada a la API para registrarse
    } else {
      // Lógica de login
      console.log("Datos de login:", form);
      // Aquí harías la llamada a la API para iniciar sesión
    }
  };

  // Alternar entre los modos de login y registro
  const toggleMode = () => {
    setIsRegister(!isRegister);
    // Reiniciar los campos cuando cambias de modo
    setForm({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div>
      <section>
        <h2>{isRegister ? "Registrar" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          {/* Mostrar campo de confirmar contraseña solo en modo registro */}
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">
            {isRegister ? "Registrar" : "Iniciar Sesión"}
          </button>
        </form>

        {/* Botón para cambiar entre los modos */}
        <p>
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button type="button" onClick={toggleMode}>
            {isRegister ? "Iniciar Sesión" : "Registrar"}
          </button>
        </p>
      </section>
    </div>
  );
};

export default AuthForm;
