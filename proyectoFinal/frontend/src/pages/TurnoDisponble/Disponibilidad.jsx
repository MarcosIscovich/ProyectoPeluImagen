import React, { useState, useEffect } from "react";
import { turnosSelected } from "../../services/turnos";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { purple, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button, Card, CardContent, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getDisponibilidad, getAllTurnos } from "../../services/turnos";
import { createNewTurno } from "../../services/newTurno";
import translate from "../../components/Translate/translate.json";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import TextFieldForms from "../../components/textFieldForms";
import ButtonPurple from "../../components/ButtonPurple";

const MySwal = withReactContent(Swal);

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

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    border: {
      color: "black",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
      purple: {
        main: "#efb7f7",
      },
    },
  });

  const defaultValues = {
    nombre: "",   
    telefono: "",   
    fecha: "",
  };

export default function Disponibilidad() {
  const [fechaDisp, setfechaDisp] = useState(new Date());
  const [dispo, setDispo] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const horadia = [
    {
      id: 1,
      hora: "08:00",
    },
    { id: 2, hora: "08:30" },
    { id: 3, hora: "09:00" },
    { id: 4, hora: "09:30" },
    { id: 5, hora: "10:00" },
    { id: 6, hora: "10:30" },
    { id: 7, hora: "11:00" },
    { id: 8, hora: "11:30" },
    { id: 9, hora: "12:00" },
    { id: 10, hora: "12:30" },
    { id: 11, hora: "13:00" },
    { id: 12, hora: "13:30" },
    { id: 13, hora: "14:00" },
    { id: 14, hora: "14:30" },
    { id: 15, hora: "15:00" },
    { id: 16, hora: "15:30" },
    { id: 17, hora: "16:00" },
    { id: 18, hora: "16:30" },
    { id: 19, hora: "17:00" },
    { id: 20, hora: "17:30" },
    { id: 21, hora: "18:00" },
    { id: 22, hora: "18:30" },
    { id: 23, hora: "19:00" },
    { id: 24, hora: "19:30" },
    { id: 25, hora: "20:00" },
  ];

  const getrows = async (dispxhora) => {
    console.log("DISPO", dispo);
    setRows(
      horadia.map((item) => ({
        id: item.id,
        hora: item.hora,
        disponible: verDisponibilidad(item.hora, dispxhora),
      }))
    );
  };

  const verDisponibilidad = (hora, dispxhora) => {
    console.log("HORA", hora);
    let disponibilidad = "";

    dispxhora.map((disp) => {
      if (hora === disp) {
        console.log("entrooooo");
        return (disponibilidad = "No disponible");
      } else {
        return (disponibilidad = "Disponible");
      }
    });
    console.log("DISPONIBILIDAD", disponibilidad);
    return disponibilidad;
  };

  const SelectDate = async () => {
    let fecha = moment(fechaDisp).format("YYYY-MM-DD");
    console.log(fecha);
    toString(fecha);

    const resp = await getDisponibilidad(fecha);
    console.log("Turnos", resp);
    const dispxhora = resp.data.map((item) => (item.hora_desde = item.hora_desde.slice(11, 16)));
    setDispo(dispxhora);

    console.log("Dispo", dispo);
    getrows(dispxhora);
  };

  const saveNewTurno = async (guarNewTurno) => {
    const newTurno = createNewTurno(guarNewTurno);
    console.log("newTurno", newTurno);
  }

  const onSubmit = (data) => {
    console.log("SUBMIT" , data)
    let guarNewTurno = {
        nombre: data.nombre,
        telefono: data.telefono,
        fecha: moment(fechaDisp).format("YYYY-MM-DD"),
    }
    saveNewTurno(guarNewTurno)

  };

  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    {
      field: "hora",
      headerName: "horas del dia",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },
    {
      field: "disponible",
      headerName: "Disponibilidad",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },

    {
      field: "acciones",
      headerName: "Acciones",
      headerAlign: "center",
      flex: 1,
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),

      renderCell: (params) => {

        return (
          <div className="flex space-x-2 ">
            
            {
                params.row.disponible === "Disponible" ? (
                    <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleOpen()}>
                        Cargar Turno
                    </Button>)

                 : (
                    <span>SIN ACCIONES</span>
                 )

            }
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2"></div>

      <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
        <Grid item xs={2}>
          <span className=" text-purple-900 ml-5 text-2xl font-bold">Fecha desde</span>
          <DatePicker
            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowLeftIcon />
                </button>
                <select
                  className="border-purple-900 border-2 rounded-md text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-13 w-15"
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className=" border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowRightIcon />
                </button>
              </div>
            )}
            selected={fechaDisp}
            onChange={(date) => setfechaDisp(date)}
            startDate={fechaDisp}
            className="mx-2 border-purple-900 border-2 rounded-md p-3 font-bold text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-15 w-40"
          />
        </Grid>
        
        <Grid item xs>
          <Button
            onClick={SelectDate}
            variant="extended"
            className=" text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            <SearchIcon sx={{ mr: 1 }} />
            Buscar Disponibilidad
          </Button>
        </Grid>
      </Grid>

      
        <DataGrid
          localeText={translate}
          style={{ height: 900, margin: 10, width: "85%" }}
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          autoHeight={true}
          align="center"
          columnHeaderHeight={50}
          className="bg-white shadow-lg drop-shadow-2xl rounded-lg my-6 border-solid border-1 border-purple-900
          w-full text-sm text-left text-violet-800 dark:text-violet-900 
          "
        />

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Card sx={{ ...style, width: 600, maxWidth: 600 }}>
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
            }}

            /*<CardMedia 
            component="img"
            height="140"
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana" /> */
          >
            
          </Typography>

          <CardContent>
            <ThemeProvider theme={theme}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                        Nombre:
                      </strong>
                      <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            margin="dense"
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                          />
                        )}
                      />
                      {errors.nombre && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                        Telefono:
                      </strong>
                      <Controller
                        name="telefono"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            margin="dense"
                            id="telefono"
                            type="number"
                            placeholder="Telefono"
                          />
                        )}
                      />
                      {errors.Telefono && <span style={{ color: "red" }}>Este campo es requerido</span>}
                    </Grid>
                  </Grid>
                </Box>

                

                <Stack
                  sx={{
                    display: "flex-row",
                    justifyContent: "end",
                    alignItems: "end",
                    marginTop: 5,
                    marginBottom: 0,
                  }}
                  direction="row"
                  spacing={2}
                >
                  <ButtonPurple onClick={handleClose} variant="outlined">
                    Cancelar
                  </ButtonPurple>
                  <ButtonPurple type="submit" variant="outlined">
                    Guardar
                  </ButtonPurple>
                </Stack>
              </form>
            </ThemeProvider>
          </CardContent>

        </Card>
      </Modal>
      
    </>
  );
}
