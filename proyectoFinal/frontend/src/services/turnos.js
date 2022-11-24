import axios from 'axios';

const url = 'http://localhost:3000/turnos/';
let token = localStorage.getItem('token');

export const getAllTurnos = async () => {
    try{
      const response = await axios.get(url /* , {headers: {Authorization: `Bearer ${token}`}} */);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getTurno = async (id) => {
    console.log("FUNCIONA GET TURNO", id);
    try{
      const response = await axios.get(url+'findTurnos/' + id /* , {headers: {Authorization: `Bearer ${token}`}} */);

    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getDisponibilidad = async (fecha) => {
    toString(fecha);
    console.log("FUNCIONA GET DISPONIBILIDAD", fecha);
    try{
        const response = await axios.get(url+'findDispon/' + fecha );
        return {ok: true , data:response.data};
    }
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const createTurno = async (Turno) => {
    try{
        const response = await axios.post(url +'create', Turno /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateTurno = async (Turno) => {
    try{
        const response = await axios.put(url +'update', Turno /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteTurno = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const turnosSelected = async (data) => {
    try{
        const response = await axios.post(url +'turnosSelected', data /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}



