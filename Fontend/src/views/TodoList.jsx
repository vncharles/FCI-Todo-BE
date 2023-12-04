import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
	Button,
	Stack,
	Typography,
	Box,
	Modal,
	TextField,
	FormLabel,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const fetchData = async () => {
	try {
		const response = await axios.get('http://127.0.0.1:5000/todo');

		if (response.status === 200) {
			const result = await response.data;
			return result;
		} else {
			const result = await response.data;
			alert('Error: ' + result.message);
		}
	} catch (e) {
		alert('Error');
	}
};

const TodoList = () => {
	const [openModal, setOpenModal] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [completed, setCompleted] = useState(false);
	const [currentTaskId, setCurrentTaskId] = useState(null);

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const handleSubmit = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/todo', {
				name,
				description,
				completed,
			});

			if (response.status === 201) {
				alert('Create successfully!');
				setName('');
				setDescription('');
				setCompleted(false);
				handleClose();
				navigate('.');
			}
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	const handleUpdateTask = async () => {
		const updataTask = {
			name,
			description,
			completed,
		};

		try {
			const response = await axios.put(
				`http://127.0.0.1:5000/todo/${currentTaskId}`,
				updataTask
			);

			if (response.status === 200) {
				alert('Update successfully!');
				setCurrentTaskId(null);
				setName('');
				setDescription('');
				setCompleted(false);
				handleClose();
				navigate('.');
			}
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	const data = useLoaderData();
	const navigate = useNavigate();

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`http://127.0.0.1:5000/todo/${id}`
			);

			if (response.status === 200) {
				alert('Delete successfully');
				navigate('.');
			} else {
				const errorMessage = response.data;
				alert('Error ' + errorMessage.message);
			}
		} catch (err) {
			alert('Error server');
		}
	};

	return (
		<>
			<Button
				style={{
					backgroundColor: 'lightgray',
					marginTop: 65,
					width: 25,
					height: 30,
				}}
				onClick={handleOpen}
			>
				Add
			</Button>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				style={{ marginLeft: 160 }}
			>
				<Box margin={20} backgroundColor="#fff" width={800} padding={5}>
					<Typography
						variant="h6"
						style={{ color: '#000', marginTop: 65 }}
					>
						Add task
					</Typography>
					<Stack
						spacing={2}
						direction="row"
						alignItems="center"
						marginTop={5}
					>
						<FormLabel id="name-label">Name</FormLabel>
						<TextField
							label="name"
							placeholder="input name task"
							aria-labelledby="name-label"
							fullWidth
							onChange={(event) => {
								setName(event.target.value);
							}}
							value={name}
						/>
					</Stack>
					<Stack
						spacing={2}
						direction="row"
						alignItems="center"
						marginTop={5}
					>
						<FormLabel id="description-label">
							Description
						</FormLabel>
						<TextField
							label="description"
							placeholder="input description task"
							aria-aria-labelledby="description-label"
							fullWidth
							onChange={(event) => {
								setDescription(event.target.value);
							}}
							value={description}
						/>
					</Stack>
					<Stack
						spacing={2}
						direction="row"
						alignItems="center"
						marginTop={5}
					>
						<FormLabel id="completed-label">Completed</FormLabel>
						<FormControlLabel
							control={
								<Checkbox
									checked={completed}
									onChange={(event) => {
										setCompleted(event.target.checked);
										console.log(event.target.checked);
									}}
									value={completed}
								/>
							}
							label="Done"
							aria-labelledby="completed-label"
						/>
					</Stack>
					<Stack spacing={2} marginTop={5}>
						<Button
							style={{ backgroundColor: 'lightblue' }}
							onClick={() => {
								if (!currentTaskId) handleSubmit();
								else handleUpdateTask();
							}}
						>
							Save
						</Button>
					</Stack>
				</Box>
			</Modal>
			<TableContainer
				style={{
					width: '100%',
					marginTop: 10,
					height: '100%',
					paddingLeft: 70,
				}}
			>
				<Table
					style={{ minWidth: 650, width: '100%', height: '100%' }}
					aria-label="simple table"
				>
					<TableHead>
						<TableRow>
							<TableCell align="center" component="th">
								ID
							</TableCell>
							<TableCell align="center" component="th">
								Name
							</TableCell>
							<TableCell align="center" component="th">
								Description
							</TableCell>
							<TableCell align="center" component="th">
								Completed
							</TableCell>
							<TableCell align="center" component="th">
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.name}>
								<TableCell align="center">{row.id}</TableCell>
								<TableCell align="left">{row.name}</TableCell>
								<TableCell align="left">
									{row.description}
								</TableCell>
								<TableCell align="left">
									{row.completed ? 'Done' : 'Process'}
								</TableCell>
								<TableCell align="center">
									<Button
										color="warning"
										onClick={() => {
											setCurrentTaskId(row.id);
											setName(row.name);
											setDescription(row.description);
											setCompleted(row.completed);
											setOpenModal(true);
										}}
									>
										Edit
									</Button>
									<Button
										color="error"
										onClick={() => handleDelete(row.id)}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default TodoList;
