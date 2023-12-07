/* eslint-disable react/prop-types */
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
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { createTask, updateTask } from '../api';

const ModalSaveTask = (props) => {
  const { task, openModal, handleClose } = props;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [completed, setCompleted] = useState(false);

	const resetState = () => {
		setName(null);
		setDescription(null);
		setCompleted(false);
	};

	useEffect(() => {
		setName(task?.name);
		setDescription(task?.description);
		setCompleted(task?.completed);
	}, [task]);

	const mutationCreateTask = useMutation((data) => createTask(data), {
		onSuccess: () => {
			resetState();
			handleClose();
			alert('Create success');
		},
		onError: () => {
			alert('Create error');
		},
	});

	const mutationUpdateTask = useMutation(
		(dataUpdate) => updateTask(task.id, dataUpdate),
		{
			onSuccess: () => {
				resetState();
				handleClose();
				alert('Update successfully!');
			},
			onError: () => {
				alert('Update error');
			},
		}
	);

	const handleSaveTask = async () => {
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

	return (
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
					<FormLabel id="description-label">Description</FormLabel>
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
							if (!task?.id) handleSaveTask();
							else handleUpdateTask();
						}}
					>
						Save
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default ModalSaveTask;
