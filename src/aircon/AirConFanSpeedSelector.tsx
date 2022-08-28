import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';

import {
	ACState,
	getFanSpeedAsString,
	getFanSpeedFromString,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

export const AirConFanSpeedSelector = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);

	const currentSpeed = getFanSpeedAsString(state?.fan);

	const handleChangeSpeed = (
		event: React.MouseEvent<HTMLElement>,
		newSpeed: string | null,
	) => {
		if (state) {
			const newSpeedValue = getFanSpeedFromString(newSpeed || '');
			state.fan = newSpeedValue;
			state.prompt_tone = !quietMode;
			setDeviceStateMutation.mutate(state);
		}
	};

	return (
		<Box margin={2}>
			<ToggleButtonGroup
				value={currentSpeed}
				onChange={handleChangeSpeed}
				exclusive
			>
				<ToggleButton value="auto">
					<Typography>AUTO</Typography>
				</ToggleButton>
				<ToggleButton value="silent">
					<Typography>S</Typography>
				</ToggleButton>
				<ToggleButton value="low">
					<Typography>L</Typography>
				</ToggleButton>
				<ToggleButton value="medium">
					<Typography>M</Typography>
				</ToggleButton>
				<ToggleButton value="high">
					<Typography>H</Typography>
				</ToggleButton>
				<ToggleButton value="full">
					<Typography>F</Typography>
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};
