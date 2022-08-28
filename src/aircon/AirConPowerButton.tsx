import { IconButton } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { ACState, usePutDeviceState } from '../homecontrol/AirconAPI';

export const AirConPowerButton = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);

	const handleClick = () => {
		if (state) {
			state.power = !state.power;
			state.prompt_tone = !quietMode;
			setDeviceStateMutation.mutate(state);
		}
	};

	return (
		<IconButton
			color={props.state?.power ? 'success' : 'error'}
			onClick={handleClick}
		>
			<PowerSettingsNewIcon />
		</IconButton>
	);
};
