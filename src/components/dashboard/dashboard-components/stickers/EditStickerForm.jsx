import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Importa SweetAlert
import { updateSticker } from "../../../../redux/actions/actions";
import style from "./EditStickerForm.module.css";

const EditStickerForm = ({ sticker, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: sticker.name,
    category: sticker.category.name,
    newCategoryName: "",
    status: sticker.status,
    img: sticker.img,
    description: sticker.description || "", // Añadir descripción
    price: sticker.price || "", // Añadir precio
    stock: sticker.stock || "", // Añadir stock
  });

  useEffect(() => {
    setFormData({
      name: sticker.name,
      category: sticker.category.name,
      newCategoryName: "",
      status: sticker.status,
      img: sticker.img,
      description: sticker.description || "", // Asegúrate de actualizar
      price: sticker.price || "", // Asegúrate de actualizar
      stock: sticker.stock || "", // Asegúrate de actualizar
    });
  }, [sticker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      newName: formData.name,
      newDescription: formData.description, // Ahora debe estar definido
      newPrice: formData.price, // Ahora debe estar definido
      newImage: formData.img,
      newStock: formData.stock, // Ahora debe estar definido
      newCategoryId: formData.newCategoryName
        ? formData.newCategoryName
        : sticker.category.id, // Usa el ID actual si no hay nuevo nombre
      newStatus: formData.status, // Incluyendo el estado
    };

    console.log("Datos enviados para actualizar el sticker:", dataToUpdate); // Para depuración

    try {
      const updatedSticker = await dispatch(
        updateSticker(sticker.id, dataToUpdate)
      );
      Swal.fire({
        icon: "success",
        title: "Sticker actualizado con éxito",
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); // Recarga la página después de hacer clic en "OK"
      });
      closeModal(); // Cierra el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar el sticker:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar el sticker",
        text: "Intenta de nuevo más tarde.",
      });
    }
  };

  return (
    <div className={style.modal}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Editar Sticker</h2>
        <div className={style.field}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="category">Categoría Actual:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            readOnly
          />
        </div>
        <div className={style.field}>
          <label htmlFor="newCategoryName">Nuevo Nombre de Categoría:</label>
          <input
            type="text"
            id="newCategoryName"
            name="newCategoryName"
            value={formData.newCategoryName}
            onChange={handleChange}
            placeholder="Ingresa un nuevo nombre (opcional)"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="status">Estado:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className={style.field}>
          <label htmlFor="img">URL de Imagen:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description} // Campo para la descripción
            onChange={handleChange}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="price">Precio:</label>
          <input
            type="number" // O el tipo que prefieras
            id="price"
            name="price"
            value={formData.price} // Campo para el precio
            onChange={handleChange}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number" // O el tipo que prefieras
            id="stock"
            name="stock"
            value={formData.stock} // Campo para el stock
            onChange={handleChange}
          />
        </div>
        <div className={style.buttons}>
          <button type="submit" className={style.submitButton}>
            Actualizar
          </button>
          <button
            type="button"
            onClick={closeModal}
            className={style.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStickerForm;
