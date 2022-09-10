import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PaletteMode } from '@mui/material';

import { useAppSelector } from './state/hooks';
import { selectTheme } from './state/settingsSlice';
import { AirConPages } from './pages/AirConPages';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { SettingsSpeedDial } from './settings/SettingsSpeedDial';

const getTheme = (theme: PaletteMode) =>
	createTheme({
		palette: {
			mode: theme,
		},
	});

function App() {
	const theme = useAppSelector(selectTheme);

	return (
		<div className="App">
			<ThemeProvider theme={getTheme(theme as PaletteMode)}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path="ac/*" element={<AirConPages />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<SettingsSpeedDial />
			</ThemeProvider>
		</div>
	);
}

export default App;
