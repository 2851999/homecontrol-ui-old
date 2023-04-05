import { IconButton } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

import {
	ACState,
	getModeFromString,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

import { useFetchScenes, usePutScene } from '../homecontrol/HueAPI';
import { Room } from '../homecontrol/HomeAPI';

export const NightModeButton = (props: {
	room: Room;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { room, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(room.ac_device_name);
	const setSceneMutation = usePutScene();

	const {
		data: scenes,
		isFetching: fetchingScenes,
		isError: errorScenes,
	} = useFetchScenes({
		'room[eq]': room.hue_room_id || '',
		'name[eq]': 'Night',
	});

	const handleClick = () => {
		if (state) {
			state.power = true;
			state.mode = getModeFromString('cool');
			state.eco = false;
			state.turbo = false;
			state.target = 18;
			state.prompt_tone = !quietMode;
			setDeviceStateMutation.mutate(state);

			if (!fetchingScenes && !errorScenes && scenes) {
				if (scenes.length > 0)
					// Assume first is right
					setSceneMutation.mutate(scenes[0].identifier);
			}
		}
	};

	return (
		<IconButton onClick={handleClick}>
			<BedIcon />
		</IconButton>
	);
};
