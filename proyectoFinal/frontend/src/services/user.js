import axios from "axios";

let url = "http://localhost:3000/user/";

export const createUser = async (user) => {
    try {
        console.log("USER",user);
        const response = await axios.post(url + "create", user);
        return { ok: true, data: response.data };
    } catch (error) {
        console.log(error);
        return { ok: false, message: error.message };
    }
    };