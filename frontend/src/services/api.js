import axios from "axios";

const API = axios.create({
baseURL: "https://todo-l7u6.onrender.com/api",
});

export default API;
