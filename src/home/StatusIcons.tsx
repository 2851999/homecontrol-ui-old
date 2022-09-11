import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DryIcon from '@mui/icons-material/Dry';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import ErrorIcon from '@mui/icons-material/Error';

export const PowerIcon = (props: { power: boolean }) => {
	return <PowerSettingsNewIcon color={props.power ? 'success' : 'error'} />;
};

export const ACModeIcon = (props: { mode: string }) => {
	switch (props.mode) {
		case 'auto':
			return <AutoModeIcon />;
		case 'cool':
			return <AcUnitIcon />;
		case 'dry':
			return <DryIcon />;
		case 'heat':
			return <WbSunnyIcon />;
		case 'fan':
			return <AirIcon />;
		default:
			return <ErrorIcon />;
	}
};
