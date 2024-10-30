import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";

const Cards = ({ stickers }) => {
  console.log("Stickers in Cards component:", stickers);

  return (
    <div className={style.container}>
      {stickers.map((sticker) => (
        <Card key={sticker.id} sticker={sticker} />
      ))}
    </div>
  );
};

export default Cards;
