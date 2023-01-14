import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DryIcon from '@mui/icons-material/Dry';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import ErrorIcon from '@mui/icons-material/Error';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Typography } from '@mui/material';

export const PowerIcon = (props: { power: boolean }) => {
	return <PowerSettingsNewIcon color={props.power ? 'success' : 'error'} />;
};

export const ACModeIcon = (props: { mode: string; textColour: string }) => {
	switch (props.mode) {
		case 'auto':
			return <AutoModeIcon sx={{ color: props.textColour }} />;
		case 'cool':
			return <AcUnitIcon sx={{ color: props.textColour }} />;
		case 'dry':
			return <DryIcon sx={{ color: props.textColour }} />;
		case 'heat':
			return <WbSunnyIcon sx={{ color: props.textColour }} />;
		case 'fan':
			return <AirIcon sx={{ color: props.textColour }} />;
		default:
			return <ErrorIcon sx={{ color: props.textColour }} />;
	}
};

export const ACEcoIcon = (props: { textColour: string }) => {
	return <EnergySavingsLeafIcon sx={{ color: props.textColour }} />;
};

export const ACTurboIcon = (props: { textColour: string }) => {
	return <ElectricBoltIcon sx={{ color: props.textColour }} />;
};

export const ACFanModeIcon = (props: {
	fanSpeed: string;
	textColour: string;
}) => {
	let symbol = props.fanSpeed.toUpperCase();
	if (symbol != 'AUTO') symbol = symbol[0];
	return <Typography color={props.textColour}>{symbol}</Typography>;
};
