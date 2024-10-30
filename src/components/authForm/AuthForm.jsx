import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, fetchStickers } from "../../redux/actions/actions"; // Asegúrate de importar fetchStickers

const AuthForm = () => {
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "", // Agregar campo name
    lastname: "", // Agregar campo lastname
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await dispatch(
          registerUser({
            email: form.email,
            password: form.password,
            name: form.name, // Agregar name
            lastname: form.lastname, // Agregar lastname
          })
        );
        console.log("Respuesta de registro:", response);

        // Llama a fetchStickers después de un registro exitoso
        await dispatch(fetchStickers());

        setForm({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          lastname: "",
        }); // Reiniciar todos los campos
      } catch (error) {
        console.error("Error al registrar:", error);
      }
    } else {
      console.log("Datos de login:", form);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastname: "",
    }); // Reiniciar todos los campos
  };

  return (
    <div>
      <section>
        <h2>{isRegister ? "Registrar" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </>
          )}
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
