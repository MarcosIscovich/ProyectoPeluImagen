import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./clientes.css";
import axios from "axios";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

    axios.post ("http://localhost:3000/clientes/create", form).then((response) => {
      console.log(response);
      handleClose();
      MySwal.fire({
        
        title: "Cliente agregado",
        text: "El cliente se ha agregado correctamente",
        icon: "success",
        background: "#fff",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar",
    })
    

    
  });
};

  return (
    <div>
      <Button className="btnAdd" onClick={handleClickOpen}>
        Agregar Cliente
      </Button>
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
          />
          <TextField
            margin="dense"
            id="telefono"
            label="Telefono"
            type="int"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="direccion"
            label="Direccion"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email "
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="redSocial"
            label="Red Social"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
