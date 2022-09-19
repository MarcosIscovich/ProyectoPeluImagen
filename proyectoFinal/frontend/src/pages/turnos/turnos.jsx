import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default class Turnos extends React.Component {
    
  render() {
    return (
        <div className=" mx-20 pt-12 pb-2">
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        style={{ height: '100vh' }}
        weekends={true}	
      />
      </div>
    )
  }
}