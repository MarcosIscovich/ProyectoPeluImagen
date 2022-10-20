import React from "react";
import FullCalendar, { formatDate, WindowScrollController } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, getEvents } from "./events";
import { getAllClientes } from "../../services/cliente";
import { getAllTrabajos } from "../../services/servicios";
import { createTurno, updateTurno, deleteTurno } from "../../services/turnos";
import { useState, useEffect } from "react";
import TurnosModal from "./turnosModal";
import allLocales from "@fullcalendar/core/locales-all";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeleteOutline } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";

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
  const [startUpdate, setStartUpdate] = useState("");
  const [endUpdate, setEndUpdate] = useState("");
  const [fechaUpdate, setFechaUpdate] = useState("");
  const [item, setItemSelected] = useState([]);
  const [turnoId, setTurnoId] = useState("");
  const [editTurno, setEditTurno] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [flagSaveTurno, setFlagSaveTurno] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([]);

  useEffect(() => {
    getEvents().then((res) => {
      console.log("RES", res);
      let event = res;
      setCurrentEvents(event);
      console.log("EVENTS", currentEvents);
    });
    getclientes();
    getServicios();
  }, []);

  //setCurrentEvents(INITIAL_EVENTS)
  //console.log("INITIAL_EVENTS", INITIAL_EVENTS);

  const getclientes = async () => {
    try {
      const data = await getAllClientes();
      console.log("CLIENTES", data);
      setClientes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServicios = async () => {
    const data = await getAllTrabajos();
    console.log("Servicios", data.data);
    setServicios(data.data);
  };

  const openEditModal = async (info) => {
    setEditTurno(true);
    console.log("INFO", info);
    setItemSelected(info.event.extendedProps);
    console.log("ITEM", item);
    setOpen(true);
    setTurnoId(info.event.id);
  };

  const openModal = (data) => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addTurno = (data) => {
    console.log("addEvent", data);
    // calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title: data.cliente,
      start: start,
      end: end,
      allDay: allDay,
      backgroundColor: "rgb(121, 134, 203)",
      borderColor: "#3f51b5",

      extendedProps: {
        id: createEventId(),
        precio: data.precio,
        fecha_concurrencia: start, // .substring(0, 10) ,
        hora_desde: start, // .substring(11, 16) ,
        hora_hasta: end, // .substring(11, 16) ,
        nombreCliente: data.cliente,
        nombreServicio: data.servicio,
        clienteId: data.clienteId,
        trabajoId: data.servicioId,
        allDay: allDay,
      },
    });
  };

  const saveTurno = async (data) => {
    console.log("DATA SAVETURNO", data);
    const turno = await createTurno(data.event.extendedProps);
    console.log("TURNO", turno);
    if (turno.ok) {
      MySwal.fire({
        title: "Turno creado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFlagSaveTurno(true);
      setTurnoId(turno.data.id);
    } else {
      MySwal.fire({
        title: "Error al crear turno",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const turnosEdit = async (data) => {
    console.log("DATA EDITTURNO", data);
    const turno = await updateTurno(data);
    console.log("TURNO", turno);
    turno.ok
      ? enqueueSnackbar(SnackBar[0].message, { variant: SnackBar[0].variant })
      : enqueueSnackbar(SnackBar[1].message, { variant: SnackBar[1].variant });

    await setCurrentEvents("");
    setItemSelected([]);
    setEditTurno(false);
    getEvents().then((res) => {
      console.log("RES", res);
      let event = res;
      setCurrentEvents(event);
      console.log("EVENTS", currentEvents);
    });
  };

  const updateDataTurno = async (data) => {
    console.log("DATA UPDATE", data);
    console.log("SAVE TURNO", turnoId);
    if (data.event === undefined) {
      return;
    } else {
      console.log("DATAUPDATE", data.event);
      setStartUpdate(data.event.startStr);
      setEndUpdate(data.event.endStr);
      setFechaUpdate(data.event.startStr);
      console.log("DATAUPDATE", data.event.startStr);
    }

    let updateData = {
      id: flagSaveTurno ? turnoId : data.event.id,
      hora_desde: data.event.startStr,
      hora_hasta: data.event.endStr,
      fecha_concurrencia: data.event.startStr,
      clienteId: data.event.extendedProps.clienteId,
      trabajoId: data.event.extendedProps.trabajoId,
      precio: data.event.extendedProps.precio,
      //allDay: data.event.allDay,
    };
    console.log("UpdateData", updateData);

    const turnoUpdate = await updateTurno(updateData);
    setTurnoId("");
    console.log("TURNO ID UPDATE", turnoId);
    console.log("TURNOUPDATE", turnoUpdate);
    turnoUpdate.ok
      ? enqueueSnackbar(SnackBar[0].message, { variant: SnackBar[0].variant })
      : enqueueSnackbar(SnackBar[1].message, { variant: SnackBar[1].variant });
  };

  const handleDateSelect = (data) => {
    console.log("SELECT INFO", data);
    setCalendarApi(data.view.calendar);
    setStart(data.startStr);
    setEnd(data.endStr);
    setAllDay(data.allDay);
  };

  const handleEventClick = (clickInfo) => {
    console.log("ABRIO MODAL")
    console.log("CLICK INFO", clickInfo);
    setTurnoId(clickInfo.event.id);
    setItemSelected(clickInfo.event.extendedProps);
    openEditModal(clickInfo);
  };

  const eventRemove = async (data) => {
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
        data.event.remove();
      }
    });
  };

  const handleDelete = async (id) => {
    const dataDelete = await deleteTurno(id);
    console.log("DELETE", dataDelete);
    if (dataDelete.ok === true) {
      MySwal.fire({
        title: "Turno eliminado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEvents = (events) => {
    console.log("HANDLEEVENTS", events);

    /* this.setState({
      currentEvents: events
    }) */
  };
  const eventDidMount = (info) => {
    setTimeText(info.timeText);

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
          <CreateIcon className="fill-orange-500 md:fill-orange-700  h-5" onClick={() => openEditModal(eventInfo)} />

          <DeleteOutline className="fill-red-500 md:fill-red-700 h-5" onClick={() => eventRemove(eventInfo)} />
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
      <TurnosModal
        open={open}
        item={item}
        turnoId={turnoId}
        clientes={clientes}
        servicios={servicios}
        editTurno={editTurno}
        closeModal={closeModal}
        timeText={timeText}
        addTurno={addTurno}
        turnosEdit={turnosEdit}
      />

      <div className="demo-app-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          titleFormat={{ year: "numeric", month: "long" }}
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
          dateClick={openModal}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventDidMount={eventDidMount}
          eventAdd={(data) => saveTurno(data)}
          eventChange={(data) => updateDataTurno(data)}
          eventStartEditable={(data) => console.log("DATA", data)}
          eventRemove={(data) => handleDelete(data.event.id)}
        />
      </div>
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
