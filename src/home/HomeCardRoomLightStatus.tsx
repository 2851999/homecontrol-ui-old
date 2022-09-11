import React from 'react';

import Typography from '@mui/material/Typography';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControlLabel,
	FormGroup,
	LinearProgress,
	Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Room } from '../homecontrol/HomeAPI';
import {
	useFetchGroupedLightState,
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
		data: groupState,
		isFetching: fetchingGroupState,
		isError: errorGroupState,
	} = useFetchGroupedLightState(room.hue_light_group);

	const handlePowerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (groupState && room.hue_light_group) {
			groupState.power = event.target.checked || false;

			setGroupedLightMutation.mutate({
				light_group: room.hue_light_group,
				state: groupState,
			});
		}
	};

	const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

	if (errorGroupState) return <Typography color="error">Error</Typography>;
	if (fetchingGroupState) return <LinearProgress />;
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
