import React from "react";
import style from "./Card.module.css";

const Card = ({ sticker }) => {
  return (
    <div className={style.card}>
      <img src={sticker.image} alt={sticker.name} />
      <h2>{sticker.name}</h2>
      <p>{sticker.description}</p>
    </div>
  );
};

export default Card;
