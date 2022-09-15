import axios from 'axios';


let url = 'http://localhost:3000/productos/';

if (process.env.NODE_ENV === 'production'){
    url = 'http://www.miapp.com.ar';
}

export const getProductos = async () => {
    try{
      const response = await axios.get(url);
    return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
    
}

export const createProducto = async (producto) => {
    try{
        const response = await axios.post(url +'create', producto);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const updateProducto = async (producto) => {
    try{
        const response = await axios.put(url +'update', producto);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}

export const deleteProducto = async (id) => {
    try{
        const response = await axios.delete(url +'delete/'+id);
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}