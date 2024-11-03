import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import style from "../dashboard/Dashboard.module.css";
import UserSection from "./dashboard-components/users/Users";
import TransactionSection from "./dashboard-components/transactions/Transactions";
import StickerSection from "./dashboard-components/stickers/Stickers";

const Dashboard = ({ user }) => {
  // // Verificar si el usuario es un admin
  // if (!user || user.profile !== "user") {
  //   return (
  //     <div>
  //       <h2>No tienes permisos para acceder a esta sección.</h2>
  //     </div>
  //   );
  // }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>DASHBOARD</h2>
      </div>

      {/* Menú de navegación */}
      <nav className={style.nav}>
        <Link to="stickers">Stickers</Link>
        <Link to="users">Usuarios</Link>
        <Link to="transactions">Transacciones</Link>
      </nav>

      {/* Render de la sección seleccionada basado en la ruta */}
      <div className={style.content}>
        <Routes>
          <Route path="users" element={<UserSection />} />
          <Route path="transactions" element={<TransactionSection />} />
          <Route path="stickers" element={<StickerSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
