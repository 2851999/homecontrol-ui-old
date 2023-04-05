import React from 'react';

import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';

import { Room } from '../homecontrol/HomeAPI';
import { useFetchDeviceState } from '../homecontrol/AirconAPI';
import { selectQuietMode } from '../state/settingsSlice';
import { useAppSelector } from '../state/hooks';
import { NightModeButton } from './NightModeButton';

export interface CardRoomPresetsProps {
	room: Room;
}

export const CardRoomPresets = (props: CardRoomPresetsProps) => {
	const { room } = props;

	const quietMode = useAppSelector(selectQuietMode);

	const {
		data: deviceState,
		isFetching: fetchingState,
		isError: errorState,
	} = useFetchDeviceState(room.ac_device_name);

	if (errorState) return <Typography color="error">Error</Typography>;
	if (fetchingState) return <LinearProgress />;
	else
		return (
			<React.Fragment>
				<NightModeButton
					room={room}
					state={deviceState}
					quietMode={quietMode}
				/>
			</React.Fragment>
		);
};
