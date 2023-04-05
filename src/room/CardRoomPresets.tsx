import React from 'react';

import { Room } from '../homecontrol/HomeAPI';
import { selectQuietMode } from '../state/settingsSlice';
import { useAppSelector } from '../state/hooks';
import { NightModeButton } from './NightModeButton';

export interface CardRoomPresetsProps {
	room: Room;
}

export const CardRoomPresets = (props: CardRoomPresetsProps) => {
	const { room } = props;

	const quietMode = useAppSelector(selectQuietMode);

	return (
		<React.Fragment>
			<NightModeButton room={room} quietMode={quietMode} />
		</React.Fragment>
	);
};
