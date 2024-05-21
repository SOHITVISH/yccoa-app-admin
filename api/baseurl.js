import axios from "axios";


const instance = axios.create({ baseURL: "https://yccoaapi.ityogistech.com/api/users" })
// const instance = axios.create({baseURL:"http://13.201.123.221/api/users"})
// const instance = axios.create({ baseURL: "http://localhost:8080/api/users" })

export { instance }