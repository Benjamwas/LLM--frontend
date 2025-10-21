import axios from "axios";

const api = axios.create({
    baseURL: "https://llm-qou7.onrender.com/api",
});

export default api;