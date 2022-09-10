import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { HomePage } from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AirConUnit } from './pages/AirConUnit';
import { PaletteMode } from '@mui/material';
import { AirConSpeedDial } from './aircon/AirConSpeedDial';
import { useAppSelector } from './state/hooks';
import { selectTheme } from './state/settingsSlice';

const getTheme = (theme: PaletteMode) =>
	createTheme({
		palette: {
			mode: theme,
		},
	});

function App() {
	const theme = useAppSelector(selectTheme);

	const speedDial = <AirConSpeedDial />;

	return (
		<div className="App">
			<ThemeProvider theme={getTheme(theme as PaletteMode)}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<HomePage speedDial={speedDial} />}
						/>
						<Route
							path="/unit"
							element={<AirConUnit speedDial={speedDial} />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
