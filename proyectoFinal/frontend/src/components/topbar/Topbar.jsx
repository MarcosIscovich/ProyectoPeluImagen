import "./topbar.css";
import {NotificationsNone , Language , Settings } from '@mui/icons-material';
import { GrUserManager } from "react-icons/gr";
import logo from "../../images/descarga.png";



export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft"> <img src={logo} alt="" className="logopelu"/>{/* <span className="logo">Peluqueria Imagen</span> */}</div>
        <div className="topRight">
            <div className="topbarIconContainer">
                <NotificationsNone/>
                <span className="topIconBadge">5</span>
            </div>
            <div className="topbarIconContainer">
                <Language/>
                <span className="topIconBadge">5</span>
            </div>
            <div className="topbarIconContainer">
                <Settings/>
                <span className="topIconBadge">5</span>
            </div>
             <GrUserManager className="topAvatar"/>
        </div>
      </div>
    </div>
  );
}
