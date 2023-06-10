import React from 'react';

import Typography from '@mui/material/Typography';
import { RoomState, useFetchRoomStates, usePutRoomState } from '../homecontrol/HomeAPI';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton, Tooltip } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

const ICONS = {
	"bed": <BedIcon/>
}

export interface CardRoomStateButtonProps {
	roomState: RoomState;
}

export const CardRoomStateButton = (props: CardRoomStateButtonProps) => {
	const {roomState} = props;

	const putRoomStateMutation = usePutRoomState();

	const handleClick = () => {
		putRoomStateMutation.mutate(roomState.state_id)
	};

	return <Tooltip title={roomState.name}><IconButton onClick={handleClick}>
		{ICONS[roomState.icon]}
	</IconButton></Tooltip>
}

export interface CardRoomStatesProps {
	roomName: string;
}

export const CardRoomStates = (props: CardRoomStatesProps) => {
	const { roomName } = props;

	const {
		data: roomStates,
		isFetching: fetchingRoomStates,
		isError: errorRoomStates,
	} = useFetchRoomStates(roomName);

	if (errorRoomStates) return <Typography color="error">Error</Typography>;
	if (fetchingRoomStates) return <LinearProgress />;
	else {
		return <React.Fragment>
			{roomStates.map((roomState) => (
				<CardRoomStateButton
					roomState={roomState}
				/>
			))}
		</React.Fragment>
	}
};
