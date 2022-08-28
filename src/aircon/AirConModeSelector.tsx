import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DryIcon from '@mui/icons-material/Dry';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';

import {
	ACState,
	getModeAsString,
	getModeFromString,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

export const AirConModeSelector = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);

	const currentMode = getModeAsString(state?.mode);

	const handleChangeMode = (
		event: React.MouseEvent<HTMLElement>,
		newMode: string | null,
	) => {
		if (state) {
			const newModeValue = getModeFromString(newMode || '');
			state.mode = newModeValue;
			state.prompt_tone = !quietMode;
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
				<ToggleButton value="auto">
					<AutoModeIcon />
				</ToggleButton>
				<ToggleButton value="cool">
					<AcUnitIcon />
				</ToggleButton>
				<ToggleButton value="dry">
					<DryIcon />
				</ToggleButton>
				<ToggleButton value="heat">
					<WbSunnyIcon />
				</ToggleButton>
				<ToggleButton value="fan">
					<AirIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};
