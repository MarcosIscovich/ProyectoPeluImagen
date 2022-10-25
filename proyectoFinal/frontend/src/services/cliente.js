import axios from 'axios';

let url = 'http://localhost:3000/clientes/';
let token = localStorage.getItem('token');
if (process.env.NODE_ENV === 'production'){
    url = 'http://www.miapp.com.ar';
}

export const getAllClientes = async () => {
    try{
      const response = await axios.get(url , {headers: {Authorization: `Bearer ${token}`}});
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getCliente = async (id) => {
    try{
      const response = await axios.get(url + id , {headers: {Authorization: `Bearer ${token}`}});
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const createCliente = async (cliente) => {
    try{
        const response = await axios.post(url +'create', cliente , {headers: {Authorization: `Bearer ${token}`}});
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateCliente = async (cliente) => {
    try{
        const response = await axios.put(url +'update', cliente , {headers: {Authorization: `Bearer ${token}`}});
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteCliente = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id , {headers: {Authorization: `Bearer ${token}`}});
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}
