import {
	AppBar,
	Button,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<AppBar>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="logo"
						>
							<CatchingPokemonIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							TODOAPP
						</Typography>
						<Stack direction="row" spacing={2}>
							<Button color="inherit">Home</Button>
							<Button color="inherit">Pricing</Button>
							<Button color="inherit">About</Button>
							<Button color="inherit">Login</Button>
						</Stack>
					</Toolbar>
				</AppBar>
			</Stack>
			<Stack>
				<Outlet />
			</Stack>
		</QueryClientProvider>
	);
}

export default App;
