import React from 'react';

import Typography from '@mui/material/Typography';
import { Room, RoomState, useFetchRoomStates, usePutRoomState } from '../homecontrol/HomeAPI';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton, Tooltip } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import ComputerIcon from '@mui/icons-material/Computer';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CelebrationIcon from '@mui/icons-material/Celebration';
import WorkIcon from '@mui/icons-material/Work';

const ICONS = {
	"bed": <BedIcon/>,
	"computer": <ComputerIcon/>,
	"cold": <AcUnitIcon/>,
	"hot": <WbSunnyIcon />,
	"night": <BedtimeIcon />,
	"breakfast": <BreakfastDiningIcon />,
	"lunch": <LunchDiningIcon />,
	"dinner": <DinnerDiningIcon/>,
	"celebration": <CelebrationIcon/>,
	"work": <WorkIcon />
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
