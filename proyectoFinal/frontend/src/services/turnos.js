import axios from 'axios';

const url = 'http://localhost:3000/turnos/';

export const getAllTurnos = async () => {
    try{
      const response = await axios.get(url);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getTurno = async (id) => {
    try{
      const response = await axios.get(url + id);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const createTurno = async (Turno) => {
    try{
        const response = await axios.post(url +'create', Turno);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateTurno = async (Turno) => {
    try{
        const response = await axios.put(url +'update', Turno);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteTurno = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}



