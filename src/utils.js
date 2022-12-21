import Axios from "axios";

const getAll = (url) => Axios.get(url);

const getById = (url, id) => Axios.get(`${url}/${id}`);

const addObj = (url, obj, key) => Axios.post(url, obj,{headers:{"x-api-key":key}});

const updateObj = (url, id, obj, key) => Axios.put(`${url}/${id}`, obj,{headers:{"x-api-key":key}});

const deleteObj = (url, id, key) => Axios.delete(`${url}/${id}`,{headers:{"x-api-key":key}});

const gettodosbyid = (url, id) => Axios.get(`${url}?userId=${id}`);

export { getAll, getById, addObj, updateObj, deleteObj, gettodosbyid };
