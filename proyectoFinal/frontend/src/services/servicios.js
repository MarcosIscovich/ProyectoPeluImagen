import axios from 'axios';

let url = 'http://localhost:3000/servicios/';
let token = localStorage.getItem('token');

if (process.env.NODE_ENV === 'production'){
    url = 'http://www.miapp.com.ar';
}

export const getAllTrabajos = async () => {
    try{
      const response = await axios.get(url /* , {headers: {Authorization: `Bearer ${token}`}} */);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getTrabajos = async (id) => {
    try{
      const response = await axios.get(url + id/* , {headers: {Authorization: `Bearer ${token}`}} */);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const createTrabajo = async (Trabajo) => {
    try{
        const response = await axios.post(url +'create', Trabajo/* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateTrabajo = async (Trabajo) => {
    try{
        const response = await axios.put(url +'update', Trabajo /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteTrabajo = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id /* , {headers: {Authorization: `Bearer ${token}`}} */);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}
