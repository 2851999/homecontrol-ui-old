import {
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	styled,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
	selectTheme,
	toggleTheme,
	selectQuietMode,
	toggleQuietMode,
} from '../state/settingsSlice';

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover,
}));

export const SettingsSpeedDial = () => {
	const theme = useAppSelector(selectTheme);
	const quietMode = useAppSelector(selectQuietMode);
	const dispatch = useAppDispatch();

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	const handleToggleQuietMode = () => {
		dispatch(toggleQuietMode());
	};

	return (
		<React.Fragment>
			<SpeedDial
				ariaLabel="Speed dial"
				sx={(theme) => ({
					position: 'fixed',
					bottom: theme.spacing(5),
					right: theme.spacing(2),
				})}
				icon={
					<SpeedDialIcon
						icon={<MenuIcon />}
						openIcon={<MenuOpenIcon />}
					/>
				}
			>
				<StyledSpeedDialAction
					key={'theme'}
					icon={
						theme == 'light' ? <DarkModeIcon /> : <LightModeIcon />
					}
					tooltipTitle={'Toggle theme'}
					onClick={handleToggleTheme}
				/>
				<StyledSpeedDialAction
					key={'quietMode'}
					icon={quietMode ? <VolumeOffIcon /> : <VolumeUpIcon />}
					tooltipTitle={'Toggle quiet mode'}
					onClick={handleToggleQuietMode}
				/>
			</SpeedDial>
		</React.Fragment>
	);
};
