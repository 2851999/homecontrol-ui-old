import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Room } from '../homecontrol/HomeAPI';
import { HomeCardRoomACStatus } from './HomeCardRoomACStatus';
import { HomeCardRoomLightStatus } from './HomeCardRoomLightStatus';

export interface HomeCardProps {
	room: Room;
}

export const HomeCard = (props: HomeCardProps) => {
	const { room } = props;

	return (
		<Card>
			{/* <CardActionArea
				component={RouterLink}
				to={`room?name=${room.name}`}
			> */}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{room.name}
				</Typography>
				{room.ac_device_name && <HomeCardRoomACStatus room={room} />}
				{room.hue_room_id && <HomeCardRoomLightStatus room={room} />}
			</CardContent>
			{/* </CardActionArea> */}
		</Card>
	);
};
