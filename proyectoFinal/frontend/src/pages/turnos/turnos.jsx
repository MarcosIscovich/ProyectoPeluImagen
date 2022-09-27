import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./events";
import { getAllClientes } from "../../services/cliente";
import { getAllTrabajos } from "../../services/servicios";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
} from "../../services/turnos";

import { useState, useEffect } from "react";
import TurnosModal from "./turnosModal";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeleteOutline } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
const MySwal = withReactContent(Swal);

export default function Turnos() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [calendarApi, setCalendarApi] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [startUpdate, setStartUpdate] = useState("");
  const [endUpdate, setEndUpdate] = useState("");
  const [fechaUpdate, setFechaUpdate] = useState("");

  useEffect(() => {
    setCurrentEvents(INITIAL_EVENTS);
  }, []);

  const getclientes = async () => {
    const data = await getAllClientes();
    console.log("CLIENTES", data.data);
    setClientes(data.data);
  };

  const getServicios = async () => {
    const data = await getAllTrabajos();
    console.log("CLIENTES", data.data);
    setServicios(data.data);
  };

  const openModal = (data) => {
    setOpen(true);
    getclientes();
    getServicios();
    //addEvent(data)
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addTurno = (data) => {
    console.log("addEvent", data);
    calendarApi.unselect(); // clear date selection
    let cliente = clientes.find((item) => item.nombre === data.clienteId);
    let trabajo = servicios.find((item) => item.nombre === data.trabajoId);

    calendarApi.addEvent({
      id: createEventId(),
      title: data.clienteId,
      start: start,
      end: end,
      allDay: allDay,
      extendedProps: {
        id: createEventId(),
        precio: data.precio,
        fecha_concurrencia: start.substring(0, 10),
        hora_desde: start.substring(11, 16),
        hora_hasta: end.substring(11, 16),
        nombreCliente: data.clienteId,
        nombreServicio: data.trabajoId,
        clienteId: cliente.id,
        trabajoId: trabajo.id,
      },
    });
    
  };

  const saveTurno = async (data) => {
    console.log("DATA SAVETURNO", data);
    const turno = await createTurno(data.event.extendedProps);
    console.log("TURNO", turno);
    MySwal.fire({
      title: "Turno creado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };


  const updateDataTurno = async (data) => {
    if(data.event === undefined){
      return
    }else{
       console.log("DATAUPDATE", data.event);
    setStartUpdate(data.event.startStr)
    setEndUpdate(data.event.endStr)
    setFechaUpdate(data.event.startStr)
    console.log("DATAUPDATE", data.event.startStr);
    }
   

    let updateData = {
      hora_desde: data.event.startStr.substring(11, 16),
      hora_hasta: data.event.endStr.substring(11, 16),
      fecha_concurrencia: data.event.startStr.substring(0, 10),
    };
    console.log("UpdateData", updateData);

    const turnoUpdate = await updateTurno(updateData);

   /*  MySwal.fire({
      title: "Turno actualizado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }); */
  };

  const handleDateSelect = (data) => {
    console.log("SELECT INFO", data);
    setCalendarApi(data.view.calendar);
    setStart(data.startStr);
    setEnd(data.endStr);
    setAllDay(data.allDay);
  };

  const handleEventClick = (clickInfo) => {
    console.log("CLICK INFO", clickInfo);
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
    return (
      <>
        <div className="flex space-x-4 justify-start items-start ...">
          <b>{eventInfo.timeText}</b>

          <CreateIcon
            className="fill-orange-500 md:fill-orange-700  h-5"
            onClick={() => {
              alert("hice click");
            }}
          />

          <DeleteOutline className="fill-red-500 md:fill-red-700 h-5" />
        </div>
        <div>
          <i>{eventInfo.event.title}</i>
          <br></br>
          <i>{eventInfo.event.extendedProps.nombreServicio}</i>
          <br></br>
          <i>{eventInfo.event.extendedProps.precio}</i>
        </div>
      </>
    );
  }

  return (
    <div className=" mx-20 pt-12 pb-2">
      <TurnosModal
        open={open}
        closeModal={closeModal}
        clientes={clientes}
        servicios={servicios}
        timeText={timeText}
        addTurno={addTurno}
      />
      <div className="demo-app-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={esLocale}
          initialView="timeGridDay"
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
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          dateClick={openModal}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventDidMount={eventDidMount}
          eventAdd={(data) => saveTurno(data)}
          eventChange={(data) => updateDataTurno(data)}
          eventRemove={function (data) {
            console.log("eventRemove", data);
          }}
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
