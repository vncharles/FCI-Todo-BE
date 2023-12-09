import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/todo';

export const fetchTodos = async () => {
	const response = await axios.get(`${BASE_URL}`);
	return response.data;
};

export const createTask = (data) => {
	return axios.post(`${BASE_URL}`, data);
};

export const updateTask = (taskId, dataUpdate) => {
	return axios.put(`${BASE_URL}/${taskId}`, dataUpdate);
};

export const deleteTask = (taskId) => {
	return axios.delete(`${BASE_URL}/${taskId}`);
};
