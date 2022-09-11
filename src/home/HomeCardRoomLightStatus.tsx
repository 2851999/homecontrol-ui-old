import React from 'react';

import Typography from '@mui/material/Typography';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CircularProgress,
	FormControlLabel,
	FormGroup,
	LinearProgress,
	Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Room } from '../homecontrol/HomeAPI';
import {
	HueRoom,
	useFetchGroupedLightState,
	useFetchRooms,
	useFetchScenes,
	usePutGroupedLightState,
} from '../homecontrol/HueAPI';
import { PowerIcon } from './StatusIcons';

export interface HomeCardRoomLightStatusProps {
	room: Room;
}

export const HomeCardRoomLightStatus = (
	props: HomeCardRoomLightStatusProps,
) => {
	const { room } = props;

	const setGroupedLightMutation = usePutGroupedLightState();

	const {
		data: rooms,
		isFetching: fetchingRooms,
		isError: errorRooms,
	} = useFetchRooms({ 'name[eq]': room.name });

	let room_info: HueRoom | undefined = undefined;
	if (rooms && rooms[0] != undefined) room_info = rooms[0];

	const {
		data: groupState,
		isFetching: fetchingGroupState,
		isError: errorGroupState,
	} = useFetchGroupedLightState(
		room_info?.light_group || '',
		room_info != undefined,
	);

	const handlePowerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (groupState && room_info && room_info.light_group) {
			groupState.power = event.target.checked || false;

			console.log(room);

			setGroupedLightMutation.mutate({
				light_group: room_info.light_group,
				state: groupState,
			});
		}
	};

	const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

	if (errorRooms || errorGroupState)
		return <Typography color="error">Error</Typography>;
	if (fetchingRooms || fetchingGroupState) return <LinearProgress />;
	else
		return (
			<React.Fragment>
				<Accordion
					expanded={panelOpen}
					onChange={() => setPanelOpen(!panelOpen)}
					elevation={2}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography sx={{ marginRight: 2 }}>
							Lighting
						</Typography>
						<PowerIcon power={groupState?.power || false} />
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ mt: 4 }}>
							<FormGroup>
								<FormControlLabel
									control={
										<Switch
											checked={groupState?.power || false}
											onChange={handlePowerSwitch}
										/>
									}
									label="Power"
								/>
							</FormGroup>
						</Box>
					</AccordionDetails>
				</Accordion>
			</React.Fragment>
		);
};
