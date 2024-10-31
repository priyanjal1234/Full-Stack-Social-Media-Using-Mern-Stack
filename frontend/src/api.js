import axios from "axios";

const api = axios.create({
    baseURL: 'https://full-stack-social-media-using-mern-stack.onrender.com/api'
})

export default api
