import axios from 'axios'

const Api = axios.create({
    baseURL: "https://my-json-server.typicode.com/gustavoclay/food"
})

export default Api;
