import axios from 'axios';

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return (
        axios
        .get(baseURL)
        .then(response => response.data)
    )
}

const add = (newObj) => {
    return (
        axios
            .post(baseURL, newObj)
            .then(response => response.data)
    )
}

const update = (id, newObj) => {
    return (
        axios
            .put(`${baseURL}/${id}`, newObj)
            .then(response => response.data)
    )
}

const remove = (id) => {
    return (
        axios
            .delete(`${baseURL}/${id}`)
            .then(response => response.data)
    )
}

export default { getAll, add, update, remove }