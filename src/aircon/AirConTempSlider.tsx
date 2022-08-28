import { Box, Slider } from '@mui/material';
import { ACState, usePutDeviceState } from '../homecontrol/AirconAPI';

export const AirConTempSlider = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);

	const handleChangeTemp = (newTemp: number) => {
		if (state) {
			state.target = newTemp;
			state.prompt_tone = !quietMode;
			setDeviceStateMutation.mutate(state);
		}
	};

	return (
		<Box sx={{ mx: 2 }}>
			<Slider
				defaultValue={state?.target}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={16}
				max={30}
				valueLabelFormat={(value: number) => `${value} \u00B0C`}
				onChangeCommitted={(e, value) =>
					handleChangeTemp(Array.isArray(value) ? value[0] : value)
				}
			/>
		</Box>
	);
};
