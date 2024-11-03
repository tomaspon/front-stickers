import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/actions";
import Swal from "sweetalert2";

const LoginDashboard = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores

    try {
      const user = await dispatch(loginUser({ email, password }));

      if (user.profile === "admin") {
        // Redirigir o mostrar el dashboard para admins
        onLoginSuccess();
      } else {
        // Manejo para usuarios que no son admins
        setError("No tienes permisos para acceder.");
        Swal.fire({
          title: "Acceso denegado",
          text: "No tienes permisos para acceder a esta sección.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      Swal.fire({
        title: "Error",
        text: "Error al iniciar sesión. Verifica tus credenciales.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginDashboard;
