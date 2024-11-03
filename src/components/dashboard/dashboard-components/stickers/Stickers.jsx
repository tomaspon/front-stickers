import style from "./Stickers.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStickers,
  deleteStickers,
} from "../../../../redux/actions/actions";
import React, { useEffect, useState } from "react";
import CreateStickerForm from "./CreateStickerForm"; // Importa el componente de formulario
import EditStickerForm from "./EditStickerForm"; // Importa el componente de edición (necesitarás crearlo)
import Swal from "sweetalert2"; // Importar SweetAlert2

const StickerSection = () => {
  const dispatch = useDispatch();
  const stickers = useSelector((state) => state.stickers);
  const [selectedStickerIds, setSelectedStickerIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [stickerToEdit, setStickerToEdit] = useState(null); // Sticker a editar

  useEffect(() => {
    const loadStickers = async () => {
      try {
        await dispatch(fetchStickers());
      } catch (error) {
        console.error("Error fetching stickers:", error);
        alert("Error al cargar stickers, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    loadStickers();
  }, [dispatch]);

  const handleCreateSticker = () => {
    setShowModal(true); // Abre el modal al hacer clic en el botón
  };

  const handleEditSticker = (sticker) => {
    setStickerToEdit(sticker);
    setShowEditModal(true); // Abre el modal de edición
  };

  const handleStickerSelection = (id) => {
    setSelectedStickerIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((stickerId) => stickerId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Resto del código...

  const handleDeleteStickers = async () => {
    if (selectedStickerIds.length > 0) {
      try {
        await dispatch(deleteStickers(selectedStickerIds));
        Swal.fire({
          icon: "success",
          title: "Stickers eliminados con éxito",
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload(); // Recarga la página después de hacer clic en "OK"
        });
      } catch (error) {
        console.error("Error deleting stickers:", error);
        Swal.fire({
          icon: "error",
          title: "Error al eliminar stickers",
          text: "Intenta de nuevo más tarde.",
        });
      }
      setSelectedStickerIds([]);
    } else {
      Swal.fire({
        icon: "info",
        title: "Selecciona al menos un sticker",
        text: "Por favor, selecciona al menos un sticker para eliminar.",
      });
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("ID copiado al portapapeles.");
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal de creación
  };

  const closeEditModal = () => {
    setShowEditModal(false); // Cierra el modal de edición
    setStickerToEdit(null); // Resetea el sticker a editar
  };

  return (
    <div className={style.stickerSection}>
      <h3>Información de Stickers</h3>
      <div className={style.buttonContainer}>
        <button
          onClick={handleCreateSticker}
          className={style.createButton}
          disabled={loading}
        >
          Crear Sticker
        </button>
        <button
          onClick={handleDeleteStickers}
          className={style.deleteButton}
          disabled={loading}
        >
          Eliminar Stickers
        </button>
      </div>
      {loading ? (
        <p>Cargando stickers...</p>
      ) : stickers.length === 0 ? (
        <p className={style.noStickersMessage}>No hay stickers disponibles</p>
      ) : (
        <table className={style.stickerTable}>
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {stickers.map((sticker, index) => (
              <tr
                key={sticker.id}
                className={index % 2 === 0 ? style.evenRow : style.oddRow}
              >
                <td>
                  <input
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#dc3545",
                    }}
                    type="checkbox"
                    checked={selectedStickerIds.includes(sticker.id)}
                    title="Selecciona para eliminar"
                    onChange={() => handleStickerSelection(sticker.id)}
                    aria-label={`Seleccionar sticker con ID ${sticker.id}`}
                  />
                </td>
                <td className={style.longText} data-text={sticker.id}>
                  {sticker.id}
                  <button
                    onClick={() => handleCopy(sticker.id)}
                    className={style.copyButton}
                    title="Copiar ID"
                    aria-label={`Copiar ID ${sticker.id}`}
                  >
                    <span>📋</span>
                  </button>
                </td>
                <td className={style.longText} data-text={sticker.name}>
                  {sticker.name}
                </td>
                <td
                  className={style.longText}
                  data-text={
                    sticker.category ? sticker.category.name : "Sin categoría"
                  }
                >
                  {sticker.category ? sticker.category.name : "Sin categoría"}
                </td>

                <td>
                  <a
                    href={sticker.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver imagen de sticker ${sticker.name}`}
                  >
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      className={style.stickerImage}
                    />
                  </a>
                </td>
                <td
                  className={`${style.status} ${
                    sticker.status === "Inactivo"
                      ? style.active
                      : style.inactive
                  }`}
                >
                  {sticker.status}
                </td>

                <td>
                  <button
                    onClick={() => handleEditSticker(sticker)}
                    className={style.editButton}
                    title="Editar Sticker"
                    aria-label={`Editar sticker ${sticker.name}`}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && <CreateStickerForm closeModal={closeModal} />}
      {showEditModal && (
        <EditStickerForm sticker={stickerToEdit} closeModal={closeEditModal} />
      )}
    </div>
  );
};

export default StickerSection;
