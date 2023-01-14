import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PaletteMode } from '@mui/material';

import { useAppSelector } from './state/hooks';
import { selectTheme } from './state/settingsSlice';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { SettingsSpeedDial } from './settings/SettingsSpeedDial';
import { RoomPages } from './pages/RoomPages';
import { MonitoringPage } from './pages/MonitoringPage';

const getTheme = (theme: PaletteMode) => {
	if (theme == 'light') {
		return createTheme({
			palette: {
				mode: theme,
				background: {
					default: 'rgb(245, 245, 245)',
				},
			},
		});
	} else {
		return createTheme({
			palette: {
				mode: theme,
			},
		});
	}
};

function App() {
	const theme = useAppSelector(selectTheme);

	return (
		<div className="App">
			<ThemeProvider theme={getTheme(theme as PaletteMode)}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path="rooms/*" element={<RoomPages />} />
						<Route
							path="monitoring/*"
							element={<MonitoringPage />}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<SettingsSpeedDial />
			</ThemeProvider>
		</div>
	);
}

export default App;
