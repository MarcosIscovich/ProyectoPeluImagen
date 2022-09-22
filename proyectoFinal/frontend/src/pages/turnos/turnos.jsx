import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId , createEvent} from './events'
import momemt from 'moment'

import { useState, useEffect } from 'react'
import TurnosModal from './turnosModal'
import esLocale from '@fullcalendar/core/locales/es';


export default function Turnos () {
  const [currentEvents, setCurrentEvents] = useState([])
  const [open, setOpen] = useState(false);
  const [timeText , setTimeText] = useState("");
  const [calendarApi, setCalendarApi] = useState(null);
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [allDay , setAllDay] = useState(false);
  

  useEffect(() => {
    setCurrentEvents(INITIAL_EVENTS)
  }, [])

  const openModal = (data) => {
    setOpen(true);
    //addEvent(data)
  }

  const closeModal = () => {
    setOpen(false);
  };

  const addTurno = (data) => {
    console.log("addEvent",data) 
    calendarApi.unselect() // clear date selection

    
      calendarApi.addEvent({
        id: createEventId(),
        title: data.precio,
        start: start,
        end: end,
        allDay: allDay,
        extendedProps: {
          precio: data.precio,
          /* fehca_concurrencia: data.startStr,
          hora_desde: data.startStr,
          hora_hasta: data.endStr,
          cliente: "CLIENTE",
          trabajoId: "TRABAJO" */
        }
      })     
   
  }


  const handleDateSelect = (data) => {  
    console.log("SELECT INFO", data)
    setCalendarApi(data.view.calendar)
    setStart(data.startStr)
    setEnd(data.endStr)
    setAllDay(data.allDay)
    
    /* calendarApi.unselect() // clear date selection

    
      calendarApi.addEvent({
        id: createEventId(),
        title: data.title,
        start: data.startStr,
        end: data.endStr,
        allDay: data.allDay,
        extendedProps: {
          precio: data.precio,
          fehca_concurrencia: data.startStr,
          hora_desde: data.startStr,
          hora_hasta: data.endStr,
          cliente: "CLIENTE",
          trabajoId: "TRABAJO"
        }
      })   */    
  }

  const handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if ( confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    console.log("HANDLEEVENTS",events)
    /* this.setState({
      currentEvents: events
    }) */
  }
  const eventDidMount = (info) => {
    setTimeText(info.timeText)
    
    renderEventContent(info)
  }

  function renderEventContent(eventInfo) {    
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <br></br>
        <i>{eventInfo.event.extendedProps.precio}</i>
      </>
    )
  }


  return (
    <div className=" mx-20 pt-12 pb-2">     
        <TurnosModal open={open} closeModal={closeModal}  timeText={timeText} addTurno={addTurno} />
      <div className='demo-app-calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}          
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locale={esLocale}
          initialView='timeGridDay'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          events={currentEvents}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          dateClick={openModal}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventDidMount={eventDidMount}
            eventAdd={function(data){ console.log('eventAdd', data) }}
            eventChange={function(data){ console.log('eventChange', data)}}
            eventRemove={function(data){ console.log('eventRemove', data)}}
        />
      </div>
    </div>
  )
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

