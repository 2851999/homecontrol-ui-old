import { IconButton } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

import {
	ACState,
	getModeFromString,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

import {
	GroupedLightState,
	useFetchRooms,
	usePutGroupedLightState,
} from '../homecontrol/HueAPI';

export const NightModeButton = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const setDeviceStateMutation = usePutDeviceState(name);
	const setLightingGroupStateMutation = usePutGroupedLightState();

	const {
		data: rooms,
		isFetching: fetchingRooms,
		isError: errorRooms,
	} = useFetchRooms();

	const handleClick = () => {
		if (state) {
			state.power = true;
			state.mode = getModeFromString('cool');
			state.eco = false;
			state.turbo = false;
			state.target = 18;
			state.prompt_tone = !quietMode;
			setDeviceStateMutation.mutate(state);

			if (!fetchingRooms && !errorRooms && rooms) {
				const room = rooms[name];
				if (room.light_group) {
					const newState: GroupedLightState = {
						power: true,
						brightness: 20,
						colour: null,
						colour_temp: 2700,
					};
					setLightingGroupStateMutation.mutate({
						light_group: room.light_group,
						state: newState,
					});
				}
			}
		}
	};

	return (
		<IconButton onClick={handleClick}>
			<BedIcon />
		</IconButton>
	);
};
