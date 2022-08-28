import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

import {
	ACState,
	getFanSpeedFromString,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

export const AirConEcoTurboSelector = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);

	const currentEcoMode = state?.eco;
	const currentTurboMode = state?.turbo;

	const currentMode = currentEcoMode
		? 'eco'
		: currentTurboMode
		? 'turbo'
		: 'none';

	const handleChangeMode = (
		event: React.MouseEvent<HTMLElement>,
		newMode: string | null,
	) => {
		if (state) {
			const newEcoMode = newMode == 'eco' && !currentEcoMode;
			const newTurboMode = newMode == 'turbo' && !currentTurboMode;
			state.eco = newEcoMode || false;
			state.turbo = newTurboMode || false;
			state.prompt_tone = !quietMode;

			if (state.turbo) {
				state.target = 17;
				state.fan = getFanSpeedFromString('full');
			}

			setDeviceStateMutation.mutate(state);
		}
	};

	return (
		<Box margin={2}>
			<ToggleButtonGroup
				value={currentMode}
				onChange={handleChangeMode}
				exclusive
			>
				<ToggleButton value="eco">
					<EnergySavingsLeafIcon />
				</ToggleButton>
				<ToggleButton value="turbo">
					<ElectricBoltIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};
