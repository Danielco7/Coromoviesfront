import Axios from "axios";

const allurl = 'http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Users'

const getAll = () => Axios.get(allurl);

const getAllapi = (url) => Axios.get(url);

const getById = (url, id) => Axios.get(`${allurl}${url}/${id}`);

const addObj = (url, obj, key) => Axios.post(`${allurl}${url}`, obj,{headers:{"x-api-key":key}});

const updateObj = (url, id, obj, key) => Axios.put(`${allurl}${url}/${id}`, obj,{headers:{"x-api-key":key}});

const deleteObj = (url, id, key) => Axios.delete(`${allurl}${url}/${id}`,{headers:{"x-api-key":key}});

const gettodosbyid = (url, id) => Axios.get(`${allurl}${url}?userId=${id}`);

export { getAll, getById, addObj, updateObj, deleteObj, gettodosbyid,getAllapi };
