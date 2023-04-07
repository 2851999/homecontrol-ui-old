import React from 'react';

import Typography from '@mui/material/Typography';
import { CircularProgress, FormControlLabel, Switch } from '@mui/material';

import { useFetchLightState, usePutLightState } from '../homecontrol/HueAPI';

export interface CardRoomLightToggleProps {
	lightID: string;
	lightGroupID: string;
}

export const CardRoomLightToggle = (props: CardRoomLightToggleProps) => {
	const { lightID, lightGroupID } = props;

	const setLightMutation = usePutLightState(lightID, lightGroupID);

	const {
		data: lightState,
		isFetching: fetchingLightState,
		isError: errorLightState,
	} = useFetchLightState(lightID);

	const handlePowerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (lightState) {
			lightState.power = event.target.checked || false;

			setLightMutation.mutate({
				state: lightState,
			});
		}
	};

	if (errorLightState) return <Typography color="error">Error</Typography>;
	if (fetchingLightState) return <CircularProgress />;
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
