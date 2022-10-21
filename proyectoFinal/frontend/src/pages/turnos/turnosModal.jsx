import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Modal } from "@mui/material";
import TextFieldForms from "../../components/textFieldForms";
import Paper from '@mui/material/Paper';
import ButtonPurple from "../../components/ButtonPurple"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CustomPaper = (props) => {
  return <Paper elevation={8} {...props} />;
};



export default function FormDialog(props) {
  const { turnoId, open, closeModal, addTurno, timeText, editTurno, clientes, servicios, item, turnosEdit } = props;

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
    console.log("EDITAR TURNOS", turnosEdit);
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
    <>
      <Modal
        open={open}
        onClose={closeModal}
        sx={{
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Card sx={{ ...style, width: 800, maxWidth: 800 }}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "white",
              textAlign: "center",
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: purple[700],
              borderRadius: 1,
              padding: 1,
              boxShadow: 3,
            }}
          >
            Hora de inicio del turno {timeText.substring(0, 5)}
            Hs
          </Typography>

          {editTurno && (
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
              <span
                style={{
                  color: purple[700],
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  textAlign: "center",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                {editTurno && "Seleccionar cliente y servicio para editar el turno"}
              </span>
              <br />
              <span
                style={{
                  color: purple[700],
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  textAlign: "center",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                {editTurno && `Cliente Anterior: ${item.nombreCliente}`}
              </span>
              <br />
              <span
                style={{
                  color: purple[700],
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  textAlign: "center",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                {editTurno && `Servicio Anterior: ${item.nombreServicio}`}
              </span>
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 6,
            }}
          >
            <Grid container direction="row" item rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6} md={6} lg={6}>
                <strong
                  style={{
                    color: purple[700],
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    textAlign: "center",
                    marginTop: 2,
                    marginBottom: 2,
                    boxShadow: 6,
                  }}
                >
                  Clientes:
                </strong>
                <Autocomplete
                  options={clientes}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) => {
                    setClienteSelected(newValue.nombre);
                    setClienteId(newValue.id);
                  }}
                  PaperComponent={CustomPaper}
                  inputValue={clienteSelected}
                  sx={{ width: 300 , borderRadius: 2,
                    boxShadow: 6, }}
                  renderInput={(params) => <TextField {...params} variant="outlined" label="Clientes"/>}
                />
                
              </Grid>
                    
              <Grid item xs={6} md={6} lg={6}>
                <strong
                  style={{
                    color: purple[700],
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    textAlign: "center",
                    marginTop: 2,
                    marginBottom: 2,
                    boxShadow: 6,
                  }}
                >
                  Servicios:
                </strong>
                <Autocomplete
                  options={servicios}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) => {
                    setServicioSelected(newValue.nombre);
                    setServicioId(newValue.id);
                    setPrecioSelected(newValue.precio);
                    checkPrecio(true);
                  }}
                  PaperComponent={CustomPaper}
                  inputValue={servicioSelected}
                  color="secondary"
                  sx={{ width: 300 , borderRadius: 2,
                    boxShadow: 6, }}

                  renderInput={(params) => <TextField {...params} label= "Servicios" />}
                />              
              </Grid>
            </Grid>
          </Box>

          {precioOk && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 6,
              }}
            >
              <Grid container direction="column" item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
                <span
                  style={{
                    color: purple[700],
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    textAlign: "center",
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  Precio:
                </span>
                <TextFieldForms
                  sx={{
                    borderRadius: 2,
                    boxShadow: 6,
                  }}
                  autoFocus
                  margin="dense"
                  
                  id="precio"
                  label="Precio"
                  type="text"
                  value={precioSelected}
                  onChange={(e) => setPrecioSelected(e.target.value)}
                />
              </Grid>
            </Box>
          )}

          <Box sx={{ display: "flex ", justifyContent: "flex-end" , margin:"5" }}>
            <ButtonPurple onClick={closeModal}>Cancelar</ButtonPurple>
            {editTurno ? <ButtonPurple onClick={editarturno}>Guardar</ButtonPurple> : <ButtonPurple onClick={guardarTurno}>Guardar</ButtonPurple>}
          </Box>
        </Card>
      </Modal>
    </>
  );
}
