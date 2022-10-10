import { getAllTurnos} from '../../services/turnos';

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export async function  getEvents () {
    const data = await getAllTurnos();
    console.log("DATA EVENTOS",data.data);
   return data.data.map(element => {
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
          nombreServicio: element.trabajo.nombre
      }
    
    }
  })
   
      
    
       /* INITIAL_EVENTS.push({
        id: turno.id,
        title: turno.nombre,
        start: turno.fecha,
        end: turno.fecha
       */
    

}


export let INITIAL_EVENTS = [
]




export function createEventId() {

  return String(eventGuid++)
}