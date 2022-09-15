import axios from 'axios';

let url = 'http://localhost:3000/fichas/';

if (process.env.NODE_ENV === 'production'){
    url = 'http://www.miapp.com.ar';
}

export const getAllFichas = async () => {
    try{
      const response = await axios.get(url);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const getFicha = async (id) => {
    try{
      const response = await axios.get(url + id);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const createFicha = async (Ficha) => {
    try{
        const response = await axios.post(url +'create', Ficha);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateFicha = async (Ficha) => {
    try{
        const response = await axios.put(url +'update', Ficha);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteFicha = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

