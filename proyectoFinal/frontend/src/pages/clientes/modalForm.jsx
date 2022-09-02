import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
/* import DialogContentText from "@mui/material/DialogContentText"; */
import DialogTitle from "@mui/material/DialogTitle";
import "./clientes.css";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function FormDialog(props) {
  const open = props.open;
  const handleClose = props.handleClose;
  const item = props.item;
  const edit = props.edit;
  const rowsdata = props.rowsdata;

  const editData = () => {
    const editData = {
      id: item.id,
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      email: document.getElementById("email").value,
      fecha_nacimiento: document.getElementById("fechaNacimiento").value,
      red_social: document.getElementById("redSocial").value,
    };
    console.log("editData", editData);
    axios
      .put("http://localhost:3000/clientes//update", editData)
      .then((response) => {
        console.log("entra a editData", response.data);
        handleClose();
        MySwal.fire({
          title: "Cliente editado",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          rowsdata();
        });
      });
  };

  const handleSave = () => {
    const form = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      email: document.getElementById("email").value,
      fecha_nacimiento: document.getElementById("fechaNacimiento").value,
      red_social: document.getElementById("redSocial").value,
    };

    axios
      .post("http://localhost:3000/clientes/create", form)
      .then((response) => {
        console.log(response);
        handleClose();
        MySwal.fire({
          title: "Cliente agregado",
          text: "El cliente se ha agregado correctamente",
          icon: "success",
          background: "#fff",
          confirmButtonColor: "red",
          confirmButtonText: "Aceptar",
        });
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agendar Cliente</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            {...(item.nombre && { defaultValue: item.nombre })}
          />
          <TextField
            margin="dense"
            id="telefono"
            label="Telefono"
            type="int"
            fullWidth
            variant="standard"
            {...(item.telefono && { defaultValue: item.telefono })}
          />
          <TextField
            margin="dense"
            id="direccion"
            label="Direccion"
            type="text"
            fullWidth
            variant="standard"
            {...(item.direccion && { defaultValue: item.direccion })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email "
            type="email"
            fullWidth
            variant="standard"
            {...(item.email && { defaultValue: item.email })}
          />
          <TextField
            margin="dense"
            id="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            fullWidth
            variant="standard"
            {...(item.fecha_nacimiento && {
              defaultValue: item.fecha_nacimiento,
            })}
          />
          <TextField
            margin="dense"
            id="redSocial"
            label="Red Social"
            type="text"
            fullWidth
            variant="standard"
            {...(item.red_social && { defaultValue: item.red_social })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          {edit ? (
            <Button onClick={editData}>Editar</Button>
          ) : (
            <Button onClick={handleSave}>Guardar</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
