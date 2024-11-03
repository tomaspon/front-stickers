import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";

const Cards = ({ stickers }) => {
  console.log("Stickers in Cards component:", stickers);

  // Asegúrate de que stickers sea un array
  if (!Array.isArray(stickers)) {
    return <div>No hay stickers disponibles.</div>; // Maneja el caso en que stickers no sea un array
  }

  return (
    <div className={style.container}>
      <div className={style.cards}>
        {stickers.map((sticker) => (
          <Card key={sticker.id} sticker={sticker} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
