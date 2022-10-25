import axios from 'axios';

let url = 'http://localhost:3000/login/';


export const login = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(url, data);
        return {ok: true , data:response.data}; 
    } 
    catch (error) {
        console.log(error);
        return {ok: false , message: error.message};
    }
}