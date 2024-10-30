import React from "react";
import style from "./Landing.module.css";
import Header from "../header/Header";

const Landing = () => {
  return (
    <div>
      <header className={style.header}>
        <Header />
      </header>

      <section className={style.banner}>
        <img src="path/to/image.jpg" alt="Banner de stickers" />
        <p>Descubre nuestros stickers únicos para personalizar tu mundo</p>
      </section>
      <section className={style.benefits}>
        <h2>Beneficios</h2>
        <ul>
          <li>Envíos gratis en compras mayores a $10000</li>
          <li>10% de descuento en transferencias bancarias</li>
        </ul>
      </section>
      <section className={style.stickerSection}>
        <a href="http://localhost:5173/catalogo">Ver catálogo</a>
      </section>
    </div>
  );
};

export default Landing;
