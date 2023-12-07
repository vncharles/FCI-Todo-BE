import axios from 'axios';

export const fetchTodos = async () => {
	const response = await axios.get('http://127.0.0.1:5000/todo');
	return response.data;
};

export const createTask = (data) => {
	return axios.post('http://127.0.0.1:5000/todo', data);
};

export const updateTask = (taskId, dataUpdate) => {
	return axios.put(`http://127.0.0.1:5000/todo/${taskId}`, dataUpdate);
};

export const deleteTask = (taskId) => {
	return axios.delete(`http://127.0.0.1:5000/todo/${taskId}`);
};
