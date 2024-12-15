import axios from 'axios'

export const baseURL = 'https://socket-carmel.onrender.com'

const api = axios.create({
  baseURL
})

export { api }