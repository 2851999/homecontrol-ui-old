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
import { CardRoomLightToggle } from './CardRoomLightToggle';

export interface CardRoomLightStatusProps {
	room: Room;
}

export const CardRoomLightStatus = (props: CardRoomLightStatusProps) => {
	const { room } = props;

	const setGroupedLightMutation = usePutGroupedLightState(
		room.hue_light_group,
		room.hue_lights,
	);

	const {
		data: groupState,
		isFetching: fetchingGroupState,
		isError: errorGroupState,
	} = useFetchGroupedLightState(room.hue_light_group);

	const handlePowerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (groupState && room.hue_light_group) {
			groupState.power = event.target.checked || false;

			setGroupedLightMutation.mutate({
				state: groupState,
			});
		}
	};

	const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

	const backgroundColour = groupState?.power ? 'success.main' : null;
	const textColour = groupState?.power
		? 'success.contrastText'
		: 'text.primary';
	const dividerColour = groupState?.power ? 'success.contrastText' : null;

	if (errorGroupState) return <Typography color="error">Error</Typography>;
	if (fetchingGroupState) return <LinearProgress />;
	else
		return (
			<React.Fragment>
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
											color="success"
											checked={groupState?.power || false}
											onChange={handlePowerSwitch}
										/>
									}
									label="Power"
								/>
								{room.hue_lights &&
									room.hue_lights.map((lightID) => (
										<CardRoomLightToggle
											lightID={lightID}
											lightGroupID={room.hue_light_group}
										/>
									))}
							</FormGroup>
						</Box>
					</AccordionDetails>
				</Accordion>
			</React.Fragment>
		);
};
