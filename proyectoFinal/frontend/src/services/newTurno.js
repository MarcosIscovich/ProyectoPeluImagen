import axios from 'axios';

let url = 'http://localhost:3000/newturno/';

if (process.env.NODE_ENV === 'production'){
    url = 'http://www.miapp.com.ar';
}

export const createNewTurno = async (cliente) => {
    console.log("NEWTURNO",cliente);
    try{
        const response = await axios.post(url +'create', cliente );
        return {ok: true , data:response.data};  
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}