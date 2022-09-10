import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface SettingsState {
	theme: string;
	quietMode: boolean;
}

const initialState: SettingsState = {
	theme: localStorage.getItem('themeMode') || 'light',
	quietMode: localStorage.getItem('quietMode') == '1',
};

export const settingsSlice = createSlice({
	name: 'settings',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		toggleTheme: (state) => {
			const newTheme = state.theme == 'light' ? 'dark' : 'light';
			localStorage.setItem('themeMode', newTheme);
			state.theme = newTheme;
		},
		toggleQuietMode: (state) => {
			const newQuietMode = !state.quietMode;
			localStorage.setItem('quietMode', newQuietMode ? '1' : '0');
			state.quietMode = newQuietMode;
		},
	},
});

export const { toggleTheme, toggleQuietMode } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.settings.theme;
export const selectQuietMode = (state: RootState) => state.settings.quietMode;

export default settingsSlice.reducer;
