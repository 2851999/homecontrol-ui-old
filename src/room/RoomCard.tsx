import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Room } from '../homecontrol/HomeAPI';
import { CardRoomACStatus } from './CardRoomACStatus';
import { CardRoomLightStatus } from './CardRoomLightStatus';
import { CardRoomPresets } from './CardRoomPresets';

export interface RoomCardProps {
	room: Room;
}

export const RoomCard = (props: RoomCardProps) => {
	const { room } = props;

	return (
		<Card>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{room.name}
				</Typography>
				{room.ac_device_name && <CardRoomACStatus room={room} />}
				{room.hue_room_id && <CardRoomLightStatus room={room} />}
				{room.ac_device_name && room.hue_room_id && (
					<CardRoomPresets room={room} />
				)}
			</CardContent>
		</Card>
	);
};
