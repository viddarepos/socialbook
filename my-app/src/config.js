import axios from "axios";


export const axiosInstace = axios.create({
    baseURL : "https://viddasocialnetwork.herokuapp.com/api/"
})