import React from 'react';

import Typography from '@mui/material/Typography';
import { Room, RoomState, useFetchRoomStates, usePutRoomState } from '../homecontrol/HomeAPI';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton, Tooltip } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

const ICONS = {
	"bed": <BedIcon/>
}

export interface CardRoomStateButtonProps {
	room: Room,
	roomState: RoomState;
}

export const CardRoomStateButton = (props: CardRoomStateButtonProps) => {
	const {room, roomState} = props;

	const putRoomStateMutation = usePutRoomState(room, roomState);

	const handleClick = () => {
		putRoomStateMutation.mutate()
	};

	return <Tooltip title={roomState.name}><IconButton onClick={handleClick}>
		{ICONS[roomState.icon]}
	</IconButton></Tooltip>
}

export interface CardRoomStatesProps {
	room: Room;
}

export const CardRoomStates = (props: CardRoomStatesProps) => {
	const { room } = props;

	const {
		data: roomStates,
		isFetching: fetchingRoomStates,
		isError: errorRoomStates,
	} = useFetchRoomStates(room.name);

	if (errorRoomStates) return <Typography color="error">Error</Typography>;
	if (fetchingRoomStates) return <LinearProgress />;
	else {
		return <React.Fragment>
			{roomStates.map((roomState) => (
				<CardRoomStateButton
					room={room}
					roomState={roomState}
				/>
			))}
		</React.Fragment>
	}
};
