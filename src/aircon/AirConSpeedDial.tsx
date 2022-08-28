import {
	PaletteMode,
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

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover,
}));

export const AirConSpeedDial = (props: {
	themeMode: PaletteMode;
	quietMode: boolean;
	toggleTheme: () => void;
	toggleQuietMode: () => void;
}) => {
	const { themeMode, quietMode, toggleTheme, toggleQuietMode } = props;

	return (
		<React.Fragment>
			<SpeedDial
				ariaLabel="Speed dial"
				sx={(theme) => ({
					position: 'absolute',
					bottom: theme.spacing(4),
					right: theme.spacing(4),
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
						themeMode == 'light' ? (
							<DarkModeIcon />
						) : (
							<LightModeIcon />
						)
					}
					tooltipTitle={'Toggle theme'}
					onClick={toggleTheme}
				/>
				<StyledSpeedDialAction
					key={'quietMode'}
					icon={quietMode ? <VolumeOffIcon /> : <VolumeUpIcon />}
					tooltipTitle={'Toggle quiet mode'}
					onClick={toggleQuietMode}
				/>
			</SpeedDial>
		</React.Fragment>
	);
};
