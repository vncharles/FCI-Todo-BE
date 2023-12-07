import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { deleteTask, fetchTodos } from '../api';
import ModalSaveTask from '../component/ModalSaveTask';

const TodoList = () => {
	const { data, isLoading } = useQuery('todos', fetchTodos);
	let [currentTaskUpdate, setCurrentTaskUpdate] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => {
		setOpenModal(false);
		setCurrentTaskUpdate(null);
	};

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

	const handleDelete = async (taskId) => {
		mutationDeleteTask.mutate(taskId);
	};

	return (
		<>
			<ModalSaveTask
				task={currentTaskUpdate}
				handleClose={handleClose}
				openModal={openModal}
			/>
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
							<Typography variant="body1" style={{ color: '#000' }}>
								Loading...
							</Typography>
						) : data ? (
							data.map((row) => (
								<TableRow key={row.name}>
									<TableCell align="center">{row.id}</TableCell>
									<TableCell align="left">{row.name}</TableCell>
									<TableCell align="left">{row.description}</TableCell>
									<TableCell align="left">
										{row.completed ? 'Done' : 'Process'}
									</TableCell>
									<TableCell align="center">
										<Button
											color="warning"
											onClick={() => {
												setCurrentTaskUpdate({
													id: row.id,
													name: row.name,
													description: row.description,
													completed: row.completed,
												});
												setOpenModal(true);
											}}
										>
											Edit
										</Button>
										<Button color="error" onClick={() => handleDelete(row.id)}>
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
