import style from "./CreateStickerForm.module.css";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { createSticker } from "../../../../redux/actions/actions";
import { useDispatch } from "react-redux";

const CreateStickerForm = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    stock: "",
    status: "Activo",
    categoryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "stock" ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos enviados en formData:", formData);

    try {
      await dispatch(createSticker(formData));

      await Swal.fire({
        title: "Sticker creado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.reload(); // Recarga la página después de hacer clic en "OK"
      });

      closeModal(); // Cierra el modal después de enviar el formulario
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h2>Crear Sticker</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagen URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </label>
          <label>
            Categoría:
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Estado:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </label>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
          <button type="submit">Crear Sticker</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStickerForm;
