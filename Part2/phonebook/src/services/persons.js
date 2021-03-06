import axios from 'axios'
//const baseURL = "https://learn-phonebook.herokuapp.com/api/persons"
const baseURL = "http://localhost:3001/api/persons"

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  remove,
  update
}