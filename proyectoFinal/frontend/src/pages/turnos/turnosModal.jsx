import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const MySwal = withReactContent(Swal);

export default function FormDialog(props) {
  const {
    turnoId,
    open,
    closeModal,
    addTurno,
    timeText,
    editTurno,
    clientes,
    servicios,
    item,
    turnosEdit,
  } = props;

  const [clienteSelected, setClienteSelected] = useState("");
  const [servicioSelected, setServicioSelected] = useState("");
  const [precioSelected, setPrecioSelected] = useState("");
  const [clienteIdselected, setClienteId] = useState("");
  const [servicioIdselected, setServicioId] = useState("");
  const [precioOk, checkPrecio] = useState(false);

  const clearSets = () => {
    setClienteSelected("");
    setServicioSelected("");
    setPrecioSelected("");
    setClienteId("");
    setServicioId("");
    checkPrecio(false);
  };


  const guardarTurno = () => {
    let turno = {
      
      cliente: clienteSelected,
      servicio: servicioSelected,
      precio: precioSelected,
      clienteId: clienteIdselected,
      servicioId: servicioIdselected,
    };

    addTurno(turno);
    console.log("GUARDAR TURNOS", turno);
    closeModal();
    clearSets();
  };

  const editarturno = () => {
    let turno = {
      id: turnoId,
      cliente: clienteSelected,
      servicio: servicioSelected,
      precio: precioSelected,
      clienteId: clienteIdselected,
      trabajoId: servicioIdselected,
    };
    turnosEdit(turno);
    console.log("EDITAR TURNOS", turno);
    closeModal();
    clearSets();
  };



  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>
          <Typography
            paragraph
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#3f51b5",
              textAlign: "center",
              fontSize: "1.5rem",
              fontFamily: "Roboto",
              m: 0,
              p: 0,
            }}
          >
            <div>Hora de inicio del turno {timeText.substring(0, 5)}Hs</div>
            <div>
              {editTurno &&
                "Seleccionar cliente y servicio para editar el turno"}
            </div>
            <div>{editTurno && `Cliente Anterior: ${item.nombreCliente}`}</div>
            <div>
              {editTurno && `Servicio Anterior: ${item.nombreServicio}`}
            </div>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            options={clientes}
            getOptionLabel={(option) => option.nombre}           
            onChange={(event, newValue) => {
              setClienteSelected(newValue.nombre);
              setClienteId(newValue.id);
            }}
            inputValue={clienteSelected}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Clientes" />}
          />
          <Autocomplete
            options={servicios}
            getOptionLabel={(option) => option.nombre}            
            onChange={(event, newValue) => {
              setServicioSelected(newValue.nombre);
              setServicioId(newValue.id);
              setPrecioSelected(newValue.precio);
              checkPrecio(true);
            }}
            inputValue={servicioSelected}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Servicios" />
            )}
          />

          {precioOk && (
            <TextField
              autoFocus
              margin="dense"
              id="precio"
              label="Precio"
              type="text"
              value={precioSelected}
              /* onChange={(e) => setPrecioSelected(e.target.value)} */
            />
          )}

          <Box sx={{ display: "flex ", justifyContent: "flex-end" }}>
            <Button onClick={closeModal}>Cancelar</Button>
            {editTurno ? (
              <Button onClick={editarturno}>Guardar</Button>
            ) : (
              <Button onClick={guardarTurno}>Guardar</Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
