import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, updateUser } from "../../../../redux/actions/actions";
import {
  validateEmail,
  validateConfirmPassword,
  validateLastname,
  validateName,
  validatePassword,
} from "../../../utils/validator/validateForm"; // Asegúrate de que la ruta sea correcta
import styles from "./Users.module.css";
import Swal from "sweetalert2"; // Importa SweetAlert2

const UserSection = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    image: "",
    status: "Activo",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({}); // Para manejar múltiples mensajes de error

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      status: user.status,
      password: "",
      confirmPassword: "",
    });
    setIsModalOpen(true);
    setErrorMessages({}); // Reiniciar los mensajes de error al abrir el modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      lastname: "",
      email: "",
      image: "",
      status: "Activo",
      password: "",
      confirmPassword: "",
    });
    setErrorMessages({}); // Reinicia los mensajes de error al cerrar el modal
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrorMessages = {};

    // Validar cada campo, excepto la contraseña si no se ha cambiado
    const emailError = validateEmail(formData.email);
    if (emailError) newErrorMessages.email = emailError;

    const nameError = validateName(formData.name);
    if (nameError) newErrorMessages.name = nameError;

    const lastnameError = validateLastname(formData.lastname);
    if (lastnameError) newErrorMessages.lastname = lastnameError;

    // Solo validar la contraseña si se ha ingresado
    if (formData.password.trim() !== "") {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrorMessages.password = passwordError;

      const confirmPasswordError = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      );
      if (confirmPasswordError)
        newErrorMessages.confirmPassword = confirmPasswordError;
    }

    // Si hay errores, actualiza el estado y no envíes el formulario
    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    if (selectedUser) {
      const completeFormData = {
        name: formData.name !== undefined ? formData.name : selectedUser.name,
        lastname:
          formData.lastname !== undefined
            ? formData.lastname
            : selectedUser.lastname,
        email:
          formData.email !== undefined ? formData.email : selectedUser.email,
        password:
          formData.password.trim() !== ""
            ? formData.password
            : selectedUser.password,
        image:
          formData.image !== undefined ? formData.image : selectedUser.image,
        status:
          formData.status !== undefined ? formData.status : selectedUser.status,
      };

      console.log("Datos enviados al actualizar:", completeFormData);

      try {
        await dispatch(updateUser(selectedUser.id, completeFormData));
        dispatch(getAllUsers());
        handleModalClose();

        // Muestra el alert de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "Cambios guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  if (!users || !Array.isArray(users)) {
    return <div>No hay usuarios disponibles.</div>;
  }

  return (
    <div className={styles.userSection}>
      <h3>Información de Usuarios</h3>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Imagen</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.userId}>{user.id}</td>
              <td className={styles.userName}>{user.name}</td>
              <td className={styles.userLastname}>{user.lastname}</td>
              <td className={styles.userEmail}>{user.email}</td>
              <td>
                <a href={user.image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={user.image}
                    alt={`${user.name} ${user.lastname}`}
                    className={styles.userImage}
                  />
                </a>
              </td>
              <td
                className={
                  user.status === "Activo"
                    ? styles.activeStatus
                    : styles.inactiveStatus
                }
              >
                {user.status}
              </td>
              <td>
                <button
                  onClick={() => handleEditClick(user)}
                  className={styles.editButton}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Editar Usuario</h4>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errorMessages.name && (
                  <div className={styles.errorOtherMessage}>
                    {errorMessages.name}
                  </div>
                )}
              </label>
              <label>
                Apellido:
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
                {errorMessages.lastname && (
                  <div className={styles.errorOtherMessage}>
                    {errorMessages.lastname}
                  </div>
                )}
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errorMessages.email && (
                  <div className={styles.errorOtherMessage}>
                    {errorMessages.email}
                  </div>
                )}
              </label>
              <label>
                Contraseña:
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Ingrese nueva contraseña"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
                {errorMessages.password && (
                  <div className={styles.errorMessage}>
                    {errorMessages.password}
                  </div>
                )}
              </label>
              <label>
                Repetir Contraseña:
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repita la contraseña"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
                {errorMessages.confirmPassword && (
                  <div className={styles.errorMessage}>
                    {errorMessages.confirmPassword}
                  </div>
                )}
              </label>
              <label>
                Imagen:
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="URL de la imagen"
                />
              </label>
              <label>
                Estado:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </label>
              <div>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={handleModalClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSection;
