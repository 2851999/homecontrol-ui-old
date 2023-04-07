import React from 'react';

import Typography from '@mui/material/Typography';
import { FormControlLabel, LinearProgress, Switch } from '@mui/material';

import { useFetchLightState, usePutLightState } from '../homecontrol/HueAPI';

export interface CardRoomLightToggleProps {
	lightID: string;
}

export const CardRoomLightToggle = (props: CardRoomLightToggleProps) => {
	const { lightID } = props;

	const setLightMutation = usePutLightState();

	const {
		data: lightState,
		isFetching: fetchingLightState,
		isError: errorLightState,
	} = useFetchLightState(lightID);

	const handlePowerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (lightState) {
			lightState.power = event.target.checked || false;

			setLightMutation.mutate({
				lightID: lightID,
				state: lightState,
			});
		}
	};

	if (errorLightState) return <Typography color="error">Error</Typography>;
	if (fetchingLightState) return <LinearProgress />;
	else
		return (
			<FormControlLabel
				control={
					<Switch
						color="success"
						checked={lightState?.power || false}
						onChange={handlePowerSwitch}
					/>
				}
				label={lightState?.name}
			/>
		);
};
