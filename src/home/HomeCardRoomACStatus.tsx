import React from 'react';

import Typography from '@mui/material/Typography';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CircularProgress,
	LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Room } from '../homecontrol/HomeAPI';
import { getModeAsString, useFetchDeviceState } from '../homecontrol/AirconAPI';
import { AirConTempSlider } from '../aircon/AirConTempSlider';
import { AirConModeSelector } from '../aircon/AirConModeSelector';
import { AirConFanSpeedSelector } from '../aircon/AirConFanSpeedSelector';
import { AirConEcoTurboSelector } from '../aircon/AirConEcoTurboSelector';
import { AirConPowerButton } from '../aircon/AirConPowerButton';
import { selectQuietMode } from '../state/settingsSlice';
import { useAppSelector } from '../state/hooks';
import { ACModeIcon, PowerIcon } from './StatusIcons';

export interface HomeCardRoomACStatusProps {
	room: Room;
}

export const HomeCardRoomACStatus = (props: HomeCardRoomACStatusProps) => {
	const { room } = props;

	const quietMode = useAppSelector(selectQuietMode);

	const {
		data: deviceState,
		isFetching: fetchingState,
		isError: errorState,
	} = useFetchDeviceState(room.ac_device_name);

	const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

	if (errorState) return <Typography color="error">Error</Typography>;
	if (fetchingState) return <LinearProgress />;
	else
		return (
			<React.Fragment>
				<Typography gutterBottom>
					{deviceState?.indoor}&deg;C
				</Typography>
				<Accordion
					expanded={panelOpen}
					onChange={() => setPanelOpen(!panelOpen)}
					elevation={2}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography sx={{ marginRight: 2 }}>Aircon</Typography>
						<PowerIcon power={deviceState?.power || false} />
						<ACModeIcon mode={getModeAsString(deviceState?.mode)} />
						<Typography sx={{ marginLeft: 2 }}>
							{deviceState?.target} &deg;C
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ mt: 4 }}>
							<Typography variant="h5">
								{deviceState?.target} &deg;C
							</Typography>
							<AirConTempSlider
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConModeSelector
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConFanSpeedSelector
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConEcoTurboSelector
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
							<AirConPowerButton
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
						</Box>
					</AccordionDetails>
				</Accordion>
			</React.Fragment>
		);
};
