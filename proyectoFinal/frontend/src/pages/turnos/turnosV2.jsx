import React from "react";
import FullCalendar, { formatDate, WindowScrollController } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, getEvents } from "./events";
import { getAllClientes } from "../../services/cliente";
import { getAllTrabajos } from "../../services/servicios";
import { getAllTurnos } from "../../services/turnos";
import { createTurno, updateTurno, deleteTurno } from "../../services/turnos";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TurnosModal from "./turnosModal";
import allLocales from "@fullcalendar/core/locales-all";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeleteOutline } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material";
import moment from "moment";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/system";
import ButtonPurple from "../../components/ButtonPurple";

const MySwal = withReactContent(Swal);

const BootstrapTooltip = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#BE7DC0" /* 'rgba(244, 7, 247, 0.54)' */ /* 'rgba(204, 165, 0)' */,
    color: "#121417",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    height: "50px",
    whiteSpace: "pre-line",
  },
}));

const CustomPaper = (props) => {
  return <Paper elevation={8} {...props} />;
};

const SnackBar = [
  {
    variant: "success",
    message: "Turno Actualizado Correctamente",
  },
  { variant: "error", message: "Error Al Modificar El turno" },
];

export default function Turnos() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [calendarApi, setCalendarApi] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allDay, setAllDay] = useState(false);
  //const [startUpdate, setStartUpdate] = useState("");
  //const [endUpdate, setEndUpdate] = useState("");
  //const [fechaUpdate, setFechaUpdate] = useState("");
  //const [item, setItemSelected] = useState([]);
  const [turnoId, setTurnoId] = useState("");
  const [editTurno, setEditTurno] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [flagSaveTurno, setFlagSaveTurno] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([]);
  const [clienteSelected, setClienteSelected] = useState("");
  const [precioOk, checkPrecio] = useState(false);
  const [selectEventRemove, setEventRemove] = useState([]);
  const [clearSave, setClearSave] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    setClienteSelected("");
    setValue("cliente", "");
    setValue("servicio", "");
    setValue("precio", "");
    setEditTurno(false);
    checkPrecio(false);
    setTurnoId("");
  };

  useEffect(() => {
    getEvents().then((res) => {
      let event = res;
      setCurrentEvents(event);
      /* console.log("EVENTS", currentEvents); */
    });
    getclientes();
    getServicios();
  }, []);

  async function getEvents() {
    const data = await getAllTurnos();
    console.log("DATA EVENTS", data.data);
    return data.data.map((element) => {
      return {
        id: element.id,
        title: element.cliente.nombre,
        start: element.hora_desde,
        end: element.hora_hasta,
        allDay: element.allDay,
        backgroundColor: "rgb(121, 134, 203)",
        borderColor: "#fff",
        textColor: "#fff",
        extendedProps: {
          precio: element.precio,
          hora_desde: element.hora_desde,
          hora_hasta: element.hora_hasta,
          clienteId: element.clienteId,
          trabajoId: element.trabajoId,
          fecha_concurrencia: element.fecha_concurrencia,
          nombreServicio: element.trabajo.nombre,
          nombreCliente: element.cliente.nombre,
          idTurno: element.id,
        },
      };
    });
  }

  const getclientes = async () => {
    try {
      const data = await getAllClientes();
      /* console.log("CLIENTES", data); */
      setClientes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServicios = async () => {
    const data = await getAllTrabajos();
    /* console.log("Servicios", data.data); */
    setServicios(data.data);
  };

  const onSubmit = async (data) => {
    if (!editTurno) {
      console.log("DATA", data);
      let fecha = calendarApi.getDate();

      let fechaConcurrencia = moment(fecha).format("YYYY-MM-DD");
      let horaDesde = start;
      let horaHasta = end;
      /* let allDay = calendarApi.view.type === "dayGridMonth" ? true : false; */
      let cliente = data.cliente;
      let trabajo = data.servicio;
      let precio = data.precio;

      let turno = {
        fecha_concurrencia: fechaConcurrencia,
        hora_desde: horaDesde,
        hora_hasta: horaHasta,
        allDay: allDay,
        cliente: cliente,
        trabajo: trabajo,
        precio: precio,
      };

      console.log("TURNO", turno);

      calendarApi.addEvent({
        title: cliente.nombre,
        start: start,
        end: end,
        allDay: allDay,
        backgroundColor: "rgb(121, 134, 203)",
        borderColor: "#fff",
        textColor: "#fff",

        extendedProps: {
          precio: precio,
          hora_desde: horaDesde,
          hora_hasta: horaHasta,
          clienteId: cliente.id,
          trabajoId: trabajo.id,
          fecha_concurrencia: fechaConcurrencia,
          nombreServicio: trabajo.nombre,
          nombreCliente: cliente.nombre,
          cliente: cliente,
          trabajo: trabajo,
         // precio: precio,
        },
      });
      handleClose();
    } else {
      console.log("DATA EDit", data);
      console.log("TURNO ID", turnoId);
      turnosEdit(data);
    }
  };

  const saveTurno = async (data) => {
    setClearSave(true);
    console.log("DATA SAVETURNO", data);
    const turno = await createTurno(data.event.extendedProps);
    console.log("TURNO", turno);
    if (turno.ok) {
      MySwal.fire({
        title: "Turno creado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setFlagSaveTurno(true);
        setTurnoId(turno.data.id);
        setEditTurno(false);
        data.event.remove();
        getEvents().then((res) => {
          let event = res;
          setCurrentEvents(event);
        });
      });
    } else {
      MySwal.fire({
        title: "Error al crear turno",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateDataTurno = async (data) => {
    console.log("DATA UPDATE", data);
    console.log("SAVE TURNO", turnoId);

    if (data.event === undefined) {
      return;
    } else {
      console.log("DATAUPDATE ELSE", data.event);
      await setStart(data.event.startStr);
      await setEnd(data.event.endStr);
      //await setFechaUpdate(moment(data.event.startStr).format("YYYY-MM-DD"));
      console.log("DATAUPDATE ELSE", data.event.startStr);
    }
    console.log("data end", end);
    console.log("data start", start);
    let updateData = {
      id: flagSaveTurno ? turnoId : data.event.id,
      hora_desde: data.event.startStr,
      hora_hasta: data.event.endStr,
      fecha_concurrencia: moment(data.event.startStr).format("YYYY-MM-DD"),
      clienteId: data.event.extendedProps.clienteId,
      trabajoId: data.event.extendedProps.trabajoId,
      precio: data.event.extendedProps.precio,
      //allDay: data.event.allDay,
    };
    console.log("UpdateData", updateData);

    const turnoUpdate = await updateTurno(updateData);
    setTurnoId("");
    setEditTurno(false);

    console.log("TURNO ID UPDATE", turnoId);
    console.log("TURNOUPDATE", turnoUpdate);
    turnoUpdate.ok ? enqueueSnackbar(SnackBar[0].message, { variant: SnackBar[0].variant }) : enqueueSnackbar(SnackBar[1].message, { variant: SnackBar[1].variant });
  };

  const handleDateSelect = (data) => {
    console.log("handleDateSelect", data);
    setCalendarApi(data.view.calendar);
    setStart(data.startStr);
    setEnd(data.endStr);
    setAllDay(data.allDay);
    setOpen(true);
  };

  const turnosEdit = async (data) => {
    console.log("DATA EDITTURNO", data);

    let dataEditTurno = {
      id: turnoId,
      cliente: data.cliente.nombre,
      servicio: data.servicio.nombre,
      precio: data.precio,
      clienteId: data.cliente.id,
      trabajoId: data.servicio.id,
    };
    const turno = await updateTurno(dataEditTurno);
    console.log("TURNO", turno);
    turno.ok ? enqueueSnackbar(SnackBar[0].message, { variant: SnackBar[0].variant }) : enqueueSnackbar(SnackBar[1].message, { variant: SnackBar[1].variant });
    handleClose();

    await setCurrentEvents("");
    //setItemSelected([]);
    setEditTurno(false);
    getEvents().then((res) => {
      console.log("RES", res);
      let event = res;
      setCurrentEvents(event);
      console.log("EVENTS", currentEvents);
    });
  };

  const handleEventClick = (clickInfo) => {
    console.log("handleEventClick", clickInfo);
    setEventRemove(clickInfo.event);
    setTurnoId(clickInfo.event.id);
    setStart(clickInfo.event.startStr);
    setEnd(clickInfo.event.endStr);
    setEditTurno(true);
    clientes.map((cliente) => {
      if (cliente.id === clickInfo.event.extendedProps.clienteId) {
         setValue("cliente", cliente);
         
      }
      return cliente;
    });
    servicios.map((servicio) => {
      if (servicio.id === clickInfo.event.extendedProps.trabajoId) {
        return setValue("servicio", servicio);
      }
      return setValue("precio", clickInfo.event.extendedProps.precio);
    });

    console.log("CLIENTE SELECTED", clienteSelected);
    checkPrecio(true);
    setOpen(true);
  };

  const eventRemove = async (data) => {
    console.log("Event", selectEventRemove);
    handleClose();
    console.log("REMOVE", data);
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        selectEventRemove.remove();
      }
    });
  };

  const handleDelete = async (data) => {
    console.log("DATA DELETE", clearSave);
    if (clearSave) {
      setClearSave(false);
      return;
    } else {
      const dataDelete = await deleteTurno(data.event.extendedProps.idTurno);
      console.log("DELETE", dataDelete);
      setClearSave(false);
      if (dataDelete.ok === true) {
        MySwal.fire({
          title: "Turno eliminado",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

/*   const handleEvents = (events) => {
    console.log("HANDLEEVENTS", events);

    this.setState({
      currentEvents: events
    })
  }; */
  const eventDidMount = (info) => {
    setTimeText(info.timeText);
    setCalendarApi(info.view.calendar);

    renderEventContent(info);
  };

  function renderEventContent(eventInfo) {
    //console.log("RENDER INFO", eventInfo);

    return (
      <>
        <div className="flex flex-row space-x-2 justify-start items-start ...">
          <BootstrapTooltip
            data-html="true"
            title={` Horario: ${eventInfo.timeText} 
          Servicio: ${eventInfo.event.extendedProps.nombreServicio}
           Precio: $${eventInfo.event.extendedProps.precio} `}
            placement="bottom-start"
            arrow
          >
            <i className="bg-gray-200 text-gray-700 rounded-full px-4 text-sm font-semibold">{eventInfo.event.title}</i>
          </BootstrapTooltip>
        </div>
        {/* <div>
        
          <i>{eventInfo.timeText}</i>
          <br></br>
          <i>{eventInfo.event.extendedProps.nombreServicio}</i>
          <br></br>
          <i>{eventInfo.event.extendedProps.precio}</i>
      
          
        </div> */}
      </>
    );
  }

  return (
    <div className=" mx-20 pt-12 pb-2">
      <div className="demo-app-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locales={allLocales}
          locale="es"
          timeZone="local"
          initialView="timeGridDay"
          allDaySlot={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          hiddenDays={[0]}
          //navLinkDayClick="timeGridPlugin"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          events={currentEvents}
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          dateClick={function () {
            console.log("dateClick");
          }}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={function () {}} // called after events are initialized/added/changed/removed
          //you can update a remote database when these fire:
          eventAdd={saveTurno}
          eventChange={(data) => updateDataTurno(data)}
          eventRemove={handleDelete}
          eventDidMount={eventDidMount}
        />
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
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
                    Clientes:
                  </strong>
                  <Controller
                    name="cliente"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={clientes}
                        isOptionEqualToValue={(option, value) => {
                          /* console.log("option", option);
                            console.log("value", value); */
                          return option.id === value.id;
                        }}
                        getOptionLabel={(option) => option.nombre || ""}
                        onChange={(event, value) => {
                          field.onChange(value);
                        }}
                        PaperComponent={CustomPaper}
                        color={purple[700]}
                        sx={{ width: 300, borderRadius: 2, boxShadow: 6 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />
                    )}
                  />
                  {errors.cliente && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                  <Controller
                    name="servicio"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="servicio"
                        options={servicios}
                        isOptionEqualToValue={(option, value) => {
                          /* console.log("option", option);
                          console.log("value", value); */
                          return option.id === value.id;
                        }}
                        getOptionLabel={(option) => option.nombre || ""}
                        onChange={(event, value) => {
                          field.onChange(value);
                          checkPrecio(true);
                          setValue("precio", value.precio);
                        }}
                        PaperComponent={CustomPaper}
                        color="secondary"
                        sx={{ width: 300, borderRadius: 2, boxShadow: 6 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />
                    )}
                  />
                  {errors.servicio && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                  <Controller
                    name="precio"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => <TextField {...field} id="precio" variant="outlined" type="number" sx={{ width: 300, borderRadius: 2, boxShadow: 6 }} />}
                  />
                  {errors.precio && <span style={{ color: "red" }}>Este campo es requerido</span>}
                </Grid>
              </Box>
            )}

            <Box sx={{ display: "flex ", justifyContent: "flex-end", margin: "5" }}>
              <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid item xs={6} md={6} lg={6}>
                  <ButtonPurple variant="contained" color="secondary" onClick={eventRemove}>
                    Eliminar Turno
                  </ButtonPurple>
                </Grid>
                <Grid item xs={2} md={2} lg={2}></Grid>
                <Grid item xs={2} md={2} lg={2} justifyContent="end" alignItems="flex-end">
                  <ButtonPurple variant="contained" color="secondary" onClick={handleClose}>
                    Cancelar
                  </ButtonPurple>
                </Grid>
                <Grid item xs={2} md={2} lg={2} justifyContent="end" alignItems="flex-end">
                  {/*  {editTurno ? (
                    <ButtonPurple variant="contained" onClick={turnosEdit} color="primary" >
                      EDitar
                    </ButtonPurple>
                  ) : ( */}
                  <ButtonPurple variant="contained" color="primary" type="submit">
                    Guardar
                  </ButtonPurple>
                  {/* )} */}
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* export default class Turnos extends React.Component {


  state = {
    weekendsVisible: true,
    currentEvents: []
  }
 handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  OpenModal = (data) => {
    setOpen(true);
  }


  handleDateSelect = (selectInfo) => {    
    console.log(selectInfo)
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar  
    let precio = "hello world"  

    calendarApi.unselect() // clear date selection

    
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          precio: precio
        }
      })
     }

  eventDidMount = (info) => {
    console.log(info)
  }

  handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if ( confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    console.log("HANDLEEVENTS",events)
    this.setState({
      currentEvents: events
    })
  }
  render() {
    return (
      
      
        <div className=" mx-20 pt-12 pb-2">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView='timeGridDay'
            locale={'es'}            
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.OpenModal}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            //you can update a remote database when these fire:
            eventAdd={function(){ console.log('eventAdd') }}
            eventChange={function(){}}
            eventRemove={function(){}}
            
          />
        </div>
      
    )
  }



 

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <i>{eventInfo.event.precio}</i>
    </>
  )
} */
