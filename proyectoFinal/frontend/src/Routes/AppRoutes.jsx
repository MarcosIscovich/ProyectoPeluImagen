import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Clientes from "../pages/clientes/clientes";
import Productos from "../pages/productos/productos";
import Servicios from "../pages/tipoServicio/servicios";
import Turnos from "../pages/turnos/turnosV2";
import PanelAdmin from "../pages/panelAdmin/PanelAdmin";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignIn from "../pages/login/SignIn";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/panelAdmin" element={<PanelAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="productos" element={<Productos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="turnos" element={<Turnos />} />
        </Route>
      </Routes>
    </>
  );
};
