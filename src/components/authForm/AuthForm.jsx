import React, { useState } from "react";
import PasswordStrengthBar from "./PasswordStrenghtBar"; // Asegúrate de importar el componente
import { useDispatch } from "react-redux";
import {
  registerUser,
  fetchStickers,
  loginUser,
} from "../../redux/actions/actions"; // Importar loginUser
import { useNavigate } from "react-router-dom";
import style from "./AuthForm.module.css";
import Swal from "sweetalert2";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateLastname,
} from "../utils/validator/validateForm";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
      error = passwordRegex.test(value)
        ? ""
        : "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.";

      let strength = 0;
      let hasUpperCase = /[A-Z]/.test(value);
      let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      let hasNumber = /\d/.test(value);

      if (value.length >= 6) {
        strength++;
        if (hasUpperCase) strength++;
        if (hasSpecialChar) strength++;
        if (hasNumber) strength++;
      }

      if (value.length >= 20 && hasUpperCase && hasSpecialChar && hasNumber) {
        setPasswordStrength(4);
      } else {
        setPasswordStrength(strength);
      }
    } else if (name === "confirmPassword") {
      error = validateConfirmPassword(form.password, value);
    } else if (name === "name") {
      error = validateName(value);
    } else if (name === "lastname") {
      error = validateLastname(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastname: "",
    });

    if (isRegister) {
      const emailError = validateEmail(form.email);
      const passwordError = validatePassword(form.password);
      const confirmPasswordError = validateConfirmPassword(
        form.password,
        form.confirmPassword
      );
      const nameError = validateName(form.name);
      const lastnameError = validateLastname(form.lastname);

      if (
        emailError ||
        passwordError ||
        confirmPasswordError ||
        nameError ||
        lastnameError
      ) {
        setErrors((prev) => ({
          ...prev,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
          name: nameError,
          lastname: lastnameError,
        }));
        return;
      }

      try {
        const response = await dispatch(
          registerUser({
            email: form.email,
            password: form.password,
            name: form.name,
            lastname: form.lastname,
          })
        );
        console.log("Respuesta de registro:", response);
        await dispatch(fetchStickers());

        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Te has registrado correctamente.",
          confirmButtonText: "Iniciar sesión",
        }).then(() => {
          setIsRegister(false);
        });

        setForm({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          lastname: "",
        });
      } catch (error) {
        console.error("Error al registrar:", error);
        if (error.message.includes("Email already registered")) {
          setErrors((prev) => ({ ...prev, email: "Email ya registrado." }));
        }
      }
    } else {
      try {
        const response = await dispatch(
          loginUser({ email: form.email, password: form.password })
        );

        // Aquí asegúrate de que estás verificando correctamente la respuesta
        if (response.data && response.data.success) {
          // Guarda los datos del usuario en localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Almacena el usuario como un string

          // Opcional: Imprime en la consola para verificar que se guardó correctamente
          console.log(
            "Datos del usuario almacenados en local storage:",
            response.data.user
          );

          // Refresca la página

          Swal.fire({
            icon: "success",
            title: "¡Inicio de sesión exitoso!",
            text: "Bienvenido de nuevo.",
          }).then(() => {
            window.location.reload();
          });
        } else {
          setErrors((prev) => ({
            ...prev,
            password: "Credenciales incorrectas.",
          }));
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        setErrors((prev) => ({
          ...prev,
          password: "Error al iniciar sesión.",
        }));
      }
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
    });
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastname: "",
    });
  };

  return (
    <div className={style.authFormContainer}>
      <section className={style.authForm}>
        <h2>{isRegister ? "Registrar" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleSubmit}>
          <ul className={style.formList}>
            {isRegister && (
              <>
                <li>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={style.inputField}
                  />
                  {errors.name && (
                    <p className={style.errorMessage}>{errors.name}</p>
                  )}
                </li>
                <li>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                    className={style.inputField}
                  />
                  {errors.lastname && (
                    <p className={style.errorMessage}>{errors.lastname}</p>
                  )}
                </li>
              </>
            )}
            <li>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                className={style.inputField}
              />
              {errors.email && (
                <p className={style.errorMessage}>{errors.email}</p>
              )}
            </li>
            <li>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                required
                className={style.inputField}
              />
              {isRegister &&
                (isPasswordFocused || form.password.length > 0) && (
                  <PasswordStrengthBar strength={passwordStrength} />
                )}
              {errors.password && (
                <p className={style.errorMessage}>{errors.password}</p>
              )}
            </li>

            {isRegister && (
              <li>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repetir contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  className={style.inputField}
                />
                {errors.confirmPassword && (
                  <p className={style.errorMessage}>{errors.confirmPassword}</p>
                )}
              </li>
            )}
          </ul>
          <button type="submit" className={style.submitButton}>
            {isRegister ? "Registrar" : "Iniciar Sesión"}
          </button>
        </form>
        <p className={style.toggleText} onClick={toggleMode}>
          {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
        </p>
      </section>
    </div>
  );
};

export default AuthForm;

// import React, { useState } from "react";
// import PasswordStrengthBar from "./PasswordStrenghtBar"; // Asegúrate de importar el componente
// import { useDispatch } from "react-redux";
// import { registerUser, fetchStickers } from "../../redux/actions/actions";
// import { useNavigate } from "react-router-dom"; // Importar useNavigate
// import style from "./AuthForm.module.css"; // Archivo CSS
// import Swal from "sweetalert2"; // Importar SweetAlert
// import {
//   validateEmail,
//   validatePassword,
//   validateConfirmPassword,
//   validateName,
//   validateLastname,
// } from "../utils/validator/validateForm"; // Importar funciones de validación

// const AuthForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Inicializar useNavigate
//   const [isRegister, setIsRegister] = useState(false);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     lastname: "",
//   });
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     lastname: "",
//   });
//   const [passwordStrength, setPasswordStrength] = useState(0); // Estado para la fortaleza de la contraseña
//   const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Estado para saber si el input de contraseña está enfocado

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     // Validar el campo en tiempo real
//     let error = "";
//     if (name === "email") {
//       error = validateEmail(value);
//     } else if (name === "password") {
//       // Usar regex para validar la contraseña
//       const passwordRegex =
//         /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
//       error = passwordRegex.test(value)
//         ? ""
//         : "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.";

//       // Calcular la fortaleza de la contraseña
//       let strength = 0;
//       let hasUpperCase = /[A-Z]/.test(value);
//       let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
//       let hasNumber = /\d/.test(value);

//       // Comenzar la validación a partir de 6 caracteres
//       if (value.length >= 6) {
//         strength++; // Mínimo 6 caracteres
//         if (hasUpperCase) strength++; // Al menos una mayúscula
//         if (hasSpecialChar) strength++; // Al menos un carácter especial
//         if (hasNumber) strength++; // Al menos un número
//       }

//       // Asignar "muy fuerte" solo si se cumplen todos los requisitos y la longitud es mayor o igual a 20
//       if (value.length >= 20 && hasUpperCase && hasSpecialChar && hasNumber) {
//         setPasswordStrength(4); // Puedes asignar un valor específico para "muy fuerte"
//       } else {
//         setPasswordStrength(strength); // Actualizar fuerza de la contraseña normalmente
//       }
//     } else if (name === "confirmPassword") {
//       error = validateConfirmPassword(form.password, value);
//     } else if (name === "name") {
//       error = validateName(value);
//     } else if (name === "lastname") {
//       error = validateLastname(value);
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handlePasswordFocus = () => {
//     setIsPasswordFocused(true); // Establecer que el input de contraseña está enfocado
//   };

//   const handlePasswordBlur = () => {
//     setIsPasswordFocused(false); // Establecer que el input de contraseña no está enfocado
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Limpiar errores previos
//     setErrors({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       lastname: "",
//     });

//     // Validación de campos
//     if (isRegister) {
//       const emailError = validateEmail(form.email);
//       const passwordError = validatePassword(form.password);
//       const confirmPasswordError = validateConfirmPassword(
//         form.password,
//         form.confirmPassword
//       );
//       const nameError = validateName(form.name);
//       const lastnameError = validateLastname(form.lastname);

//       // Establecer errores en el estado
//       if (emailError) {
//         setErrors((prev) => ({ ...prev, email: emailError }));
//       }
//       if (passwordError) {
//         setErrors((prev) => ({ ...prev, password: passwordError }));
//       }
//       if (confirmPasswordError) {
//         setErrors((prev) => ({
//           ...prev,
//           confirmPassword: confirmPasswordError,
//         }));
//       }
//       if (nameError) {
//         setErrors((prev) => ({ ...prev, name: nameError }));
//       }
//       if (lastnameError) {
//         setErrors((prev) => ({ ...prev, lastname: lastnameError }));
//       }

//       // Si hay errores, no continuar
//       if (
//         emailError ||
//         passwordError ||
//         confirmPasswordError ||
//         nameError ||
//         lastnameError
//       )
//         return;

//       try {
//         const response = await dispatch(
//           registerUser({
//             email: form.email,
//             password: form.password,
//             name: form.name,
//             lastname: form.lastname,
//           })
//         );
//         console.log("Respuesta de registro:", response);
//         await dispatch(fetchStickers());

//         // Mostrar SweetAlert
//         Swal.fire({
//           icon: "success",
//           title: "¡Registro exitoso!",
//           text: "Te has registrado correctamente.",
//           confirmButtonText: "Iniciar sesión",
//         }).then(() => {
//           // Cerrar el formulario y cambiar a modo de inicio de sesión
//           setIsRegister(false); // Cambiar a modo de inicio de sesión
//         });

//         // Reiniciar el formulario
//         setForm({
//           email: "",
//           password: "",
//           confirmPassword: "",
//           name: "",
//           lastname: "",
//         });
//       } catch (error) {
//         console.error("Error al registrar:", error);
//         if (error.message.includes("Email already registered")) {
//           setErrors((prev) => ({ ...prev, email: "Email ya registrado." }));
//         }
//       }
//     } else {
//       console.log("Datos de login:", form);
//     }
//   };

//   const toggleMode = () => {
//     setIsRegister(!isRegister);
//     setForm({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       lastname: "",
//     });
//     setErrors({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       lastname: "",
//     }); // Limpiar errores al cambiar de modo
//   };

//   return (
//     <div className={style.authFormContainer}>
//       <section className={style.authForm}>
//         <h2>{isRegister ? "Registrar" : "Iniciar Sesión"}</h2>
//         <form onSubmit={handleSubmit}>
//           <ul className={style.formList}>
//             {isRegister && (
//               <>
//                 <li>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Nombre"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className={style.inputField}
//                   />
//                   {isRegister &&
//                     errors.name && ( // Condición añadida aquí
//                       <p className={style.errorMessage}>{errors.name}</p>
//                     )}
//                 </li>
//                 <li>
//                   <input
//                     type="text"
//                     name="lastname"
//                     placeholder="Apellido"
//                     value={form.lastname}
//                     onChange={handleChange}
//                     required
//                     className={style.inputField}
//                   />
//                   {isRegister &&
//                     errors.lastname && ( // Condición añadida aquí
//                       <p className={style.errorMessage}>{errors.lastname}</p>
//                     )}
//                 </li>
//               </>
//             )}
//             <li>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Correo electrónico"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className={style.inputField}
//               />
//               {isRegister &&
//                 errors.email && ( // Condición añadida aquí
//                   <p className={style.errorMessage}>{errors.email}</p>
//                 )}
//             </li>
//             <li>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Contraseña"
//                 value={form.password}
//                 onChange={handleChange}
//                 onFocus={handlePasswordFocus} // Manejador de enfoque
//                 onBlur={handlePasswordBlur} // Manejador de desenfoque
//                 required
//                 className={style.inputField}
//               />
//               <div className={style.passBar}>
//                 {isRegister &&
//                   (isPasswordFocused || form.password.length > 0) && (
//                     <PasswordStrengthBar strength={passwordStrength} />
//                   )}
//               </div>
//               {isRegister &&
//                 errors.password && ( // Condición añadida aquí
//                   <p className={style.errorMessage}>{errors.password}</p>
//                 )}
//             </li>

//             {isRegister && (
//               <li>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Repetir contraseña"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   maxLength={20} // Establece la longitud máxima en 20 caracteres
//                   required
//                   className={style.inputField}
//                 />
//                 {isRegister &&
//                   errors.confirmPassword && ( // Condición añadida aquí
//                     <p className={style.errorMessage}>
//                       {errors.confirmPassword}
//                     </p>
//                   )}
//               </li>
//             )}
//           </ul>
//           <button type="submit" className={style.submitButton}>
//             {isRegister ? "Registrar" : "Iniciar Sesión"}
//           </button>
//         </form>
//         <p className={style.toggleText} onClick={toggleMode}>
//           {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
//         </p>
//       </section>
//     </div>
//   );
// };

// export default AuthForm;
