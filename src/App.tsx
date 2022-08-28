import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { HomePage } from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AirConUnit } from './pages/AirConUnit';
import { PaletteMode } from '@mui/material';
import { AirConSpeedDial } from './aircon/AirConSpeedDial';

const getTheme = (theme: PaletteMode) =>
	createTheme({
		palette: {
			mode: theme,
		},
	});

function App() {
	const savedThemeMode = localStorage.getItem('themeMode');
	const [theme, setTheme] = React.useState(
		savedThemeMode ? savedThemeMode : 'light',
	);

	const [quietMode, setQuietMode] = React.useState(
		localStorage.getItem('quietMode') == '1',
	);

	const handleToggleTheme = () => {
		const newTheme = theme == 'light' ? 'dark' : 'light';
		localStorage.setItem('themeMode', newTheme);
		setTheme(newTheme);
	};

	const handleToggleQuietMode = () => {
		const newQuietMode = !quietMode;
		localStorage.setItem('quietMode', newQuietMode ? '1' : '0');
		setQuietMode(newQuietMode);
	};

	const speedDial = (
		<AirConSpeedDial
			themeMode={theme as PaletteMode}
			quietMode={quietMode}
			toggleTheme={handleToggleTheme}
			toggleQuietMode={handleToggleQuietMode}
		/>
	);

	return (
		<div className="App">
			<ThemeProvider theme={getTheme(theme as PaletteMode)}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<HomePage
									speedDial={speedDial}
									quietMode={quietMode}
								/>
							}
						/>
						<Route
							path="/unit"
							element={
								<AirConUnit
									speedDial={speedDial}
									quietMode={quietMode}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
