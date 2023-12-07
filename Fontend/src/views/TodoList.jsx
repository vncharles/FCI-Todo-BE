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
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { createTask, deleteTask, fetchTodos, updateTask } from '../api';

const TodoList = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [completed, setCompleted] = useState(false);
	const [currentTaskId, setCurrentTaskId] = useState(null);

	const { data, isLoading } = useQuery('todos', fetchTodos);

	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const mutationCreateTask = useMutation((data) => createTask(data), {
		onSuccess: () => {
			setName('');
			setDescription('');
			setCompleted(false);
			handleClose();
			alert('Create success');
		},
		onError: () => {
			alert('Create error');
		},
		onSettled: () => {
			console.log('Settled');
		},
	});

	const mutationUpdateTask = useMutation(
		(dataUpdate) => updateTask(currentTaskId, dataUpdate),
		{
			onSuccess: () => {
				setCurrentTaskId(null);
				setName('');
				setDescription('');
				setCompleted(false);
				handleClose();
				alert('Update successfully!');
			},
			onError: () => {
				alert('Update error');
			},
			onSettled: () => {
				console.log('Settled');
			},
		}
	);

	const mutationDeleteTask = useMutation((taskId) => deleteTask(taskId), {
		onSuccess: () => {
			alert('Delete successfully!');
		},
		onError: () => {
			alert('Delete error');
		},
		onSettled: () => {
			console.log('Settled');
		},
	});

	const handleSubmit = async () => {
		const newTask = { name, description, completed };
		mutationCreateTask.mutate(newTask);
	};

	const handleUpdateTask = async () => {
		const updataTask = {
			name,
			description,
			completed,
		};

		mutationUpdateTask.mutate(updataTask);
	};

	const handleDelete = async (taskId) => {
		mutationDeleteTask.mutate(taskId);
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
						{isLoading ? (
							<Typography
								variant="body1"
								style={{ color: '#000' }}
							>
								Loading...
							</Typography>
						) : data ? (
							data.map((row) => (
								<TableRow key={row.name}>
									<TableCell align="center">
										{row.id}
									</TableCell>
									<TableCell align="left">
										{row.name}
									</TableCell>
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
							))
						) : (
							<></>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default TodoList;
