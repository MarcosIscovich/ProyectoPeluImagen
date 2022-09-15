import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Storefront,
  ContentCut,
  Home,
  MenuBookOutlined,
  ContentPasteOutlined,
  CalendarMonthOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import { GiBarbedNails } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebaWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Panel Principal</h3>
          <ul className="sidebarList">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <li className="sidebarListitem ">
                <Home className="sidebarIcon" />
                Pagina Principal
              </li>
            </Link>
            {/* <li className="sidebarListitem">
              <LineStyle className="sidebarIcon" />
              Usuarios
            </li> */}
            <Link to="/productos" style={{ textDecoration: 'none' }}>
            <li className="sidebarListitem">
              <Storefront className="sidebarIcon" />
              Productos
            </li>
            </Link>
            <li className="sidebarListitem">
              <ContentCut className="sidebarIcon" />
              Servicios Peluqueria
            </li>
            <li className="sidebarListitem">
              <GiBarbedNails className="sidebarIcon" />
              Servicios Uñas
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Clientes</h3>
          <ul className="sidebarList">
            <Link to="/clientes" style={{ textDecoration: 'none' }}>
              <li className="sidebarListitem ">
                <MenuBookOutlined className="sidebarIcon" />
                Agenda
              </li>
            </Link>
            <li className="sidebarListitem">
              <ContentPasteOutlined className="sidebarIcon" />
              Ficha de Clientes
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Turnos Peluqueria</h3>
          <ul className="sidebarList">
            <li className="sidebarListitem ">
              <CalendarMonthOutlined className="sidebarIcon" />
              Agendar Turno
            </li>
            <li className="sidebarListitem">
              <LineStyle className="sidebarIcon" />
              Ver Turnos
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Turnos Uñas</h3>
          <ul className="sidebarList">
            <li className="sidebarListitem ">
              <LineStyle className="sidebarIcon" />
              Agendar un turno
            </li>
            <li className="sidebarListitem">
              <TodayOutlined className="sidebarIcon" />
              Ver Turnos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
