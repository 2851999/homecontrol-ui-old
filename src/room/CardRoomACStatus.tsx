import React from 'react';

import Typography from '@mui/material/Typography';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Room } from '../homecontrol/HomeAPI';
import {
	getFanSpeedAsString,
	getModeAsString,
	useFetchDeviceState,
} from '../homecontrol/AirconAPI';
import { AirConTempSlider } from '../aircon/AirConTempSlider';
import { AirConModeSelector } from '../aircon/AirConModeSelector';
import { AirConFanSpeedSelector } from '../aircon/AirConFanSpeedSelector';
import { AirConEcoTurboSelector } from '../aircon/AirConEcoTurboSelector';
import { AirConPowerButton } from '../aircon/AirConPowerButton';
import { selectQuietMode } from '../state/settingsSlice';
import { useAppSelector } from '../state/hooks';
import {
	ACEcoIcon,
	ACFanModeIcon,
	ACModeIcon,
	ACTurboIcon,
	PowerIcon,
} from './StatusIcons';
import { AirConBeepButton } from '../aircon/AirConBeepButton';

export interface RoomACStatusProps {
	room: Room;
}

export const CardRoomACStatus = (props: RoomACStatusProps) => {
	const { room } = props;

	const quietMode = useAppSelector(selectQuietMode);

	const {
		data: deviceState,
		isFetching: fetchingState,
		isError: errorState,
	} = useFetchDeviceState(room.ac_device_name);

	const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

	const backgroundColour = deviceState?.power ? 'success.main' : null;
	const textColour = deviceState?.power
		? 'success.contrastText'
		: 'text.primary';
	const dividerColour = deviceState?.power ? 'success.contrastText' : null;

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
					sx={{
						'&:before': {
							backgroundColor: dividerColour,
						},
					}}
				>
					<AccordionSummary
						expandIcon={
							<ExpandMoreIcon sx={{ color: textColour }} />
						}
						sx={{
							backgroundColor: backgroundColour,
						}}
					>
						<Typography
							sx={{ marginRight: 'auto' }}
							color={textColour}
						>
							Aircon
						</Typography>
						<PowerIcon power={deviceState?.power || false} />
						<ACModeIcon
							mode={getModeAsString(deviceState?.mode)}
							textColour={textColour}
						/>
						<ACFanModeIcon
							fanSpeed={getFanSpeedAsString(deviceState?.fan)}
							textColour={textColour}
						/>
						{deviceState?.eco && (
							<ACEcoIcon textColour={textColour} />
						)}
						{deviceState?.turbo && (
							<ACTurboIcon textColour={textColour} />
						)}
						<Typography sx={{ marginLeft: 2 }} color={textColour}>
							{deviceState?.target} &deg;C
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Divider />
						<Box sx={{ mt: 4 }}>
							<AirConBeepButton
								name={room.ac_device_name}
								state={deviceState}
								quietMode={quietMode}
							/>
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
