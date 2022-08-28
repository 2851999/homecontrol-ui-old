import { Box, Card, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchDeviceState } from '../homecontrol/AirconAPI';
import { AirConPowerButton } from '../aircon/AirConPowerButton';
import { AirConModeSelector } from '../aircon/AirConModeSelector';
import { AirConTempSlider } from '../aircon/AirConTempSlider';
import { AirConFanSpeedSelector } from '../aircon/AirConFanSpeedSelector';
import { AirConEcoTurboSelector } from '../aircon/AirConEcoTurboSelector';
import { AirConBeepButton } from '../aircon/AirConBeepButton';

export const AirConUnit = (props: {
	speedDial: React.ReactNode;
	quietMode: boolean;
}) => {
	const { speedDial, quietMode } = props;

	const [searchParams] = useSearchParams();
	const name = searchParams.get('name') || '';

	const {
		data: deviceState,
		isFetching: fetchingState,
		isError: errorState,
	} = useFetchDeviceState(name);

	return (
		<Box sx={{ flexGrow: 1, padding: 4 }}>
			<Card>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<AirConBeepButton
					name={name}
					state={deviceState}
					quietMode={quietMode}
				/>
				{errorState ? (
					<Typography color="error">Error</Typography>
				) : fetchingState ? (
					<CircularProgress />
				) : (
					<React.Fragment>
						<Typography>
							Indoor: {deviceState?.indoor}&deg;C, Outdoor:{' '}
							{deviceState?.outdoor}&deg;C
						</Typography>
						<Box sx={{ mt: 4 }}>
							<Typography variant="h5">
								{deviceState?.target} &deg;C
							</Typography>
							<AirConTempSlider
								name={name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConModeSelector
								name={name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConFanSpeedSelector
								name={name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConEcoTurboSelector
								name={name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConPowerButton
								name={name}
								state={deviceState}
								quietMode={quietMode}
							/>
						</Box>
					</React.Fragment>
				)}
			</Card>
			{speedDial}
		</Box>
	);
};
