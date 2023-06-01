import { IconButton, LinearProgress, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

import {
	getModeFromString,
	useFetchDeviceState,
	usePutDeviceState,
} from '../homecontrol/AirconAPI';

import { useFetchScenes, usePutScene } from '../homecontrol/HueAPI';
import { Room } from '../homecontrol/HomeAPI';
import { usePutIR } from '../homecontrol/BroadlinkAPI';

export const NightModeButton = (props: { room: Room; quietMode: boolean }) => {
	const { room, quietMode } = props;

	let acAssignFunc: (() => void) | undefined = undefined;
	let hueAssignFunc: (() => void) | undefined = undefined;
	let fetchingState = false;
	let errorState = false;

	if (room.ac_device_name) {
		const {
			data: acDeviceState,
			isFetching: fetchingACState,
			isError: acErrorState,
		} = useFetchDeviceState(room.ac_device_name);

		const setDeviceStateMutation = usePutDeviceState(room.ac_device_name);

		acAssignFunc = () => {
			if (acDeviceState) {
				acDeviceState.power = true;
				acDeviceState.mode = getModeFromString('cool');
				acDeviceState.eco = false;
				acDeviceState.turbo = false;
				acDeviceState.target = 18;
				acDeviceState.prompt_tone = !quietMode;
				setDeviceStateMutation.mutate(acDeviceState);
			}
		};

		fetchingState = fetchingACState;
		errorState = acErrorState;
	}

	if (room.hue_room_id) {
		const {
			data: scenes,
			isFetching: fetchingScenes,
			isError: errorScenes,
		} = useFetchScenes({
			'room[eq]': room.hue_room_id || '',
			'name[eq]': 'Night',
		});

		const setSceneMutation = usePutScene();

		hueAssignFunc = () => {
			if (scenes && scenes.length > 0)
				// Assume first is right
				setSceneMutation.mutate(scenes[0].identifier);
		};

		fetchingState = fetchingState || fetchingScenes;
		errorState = errorState || errorScenes;
	}

	const setDeviceIR = usePutIR(room.name);

	const handleClick = () => {
		if (acAssignFunc) acAssignFunc();
		if (hueAssignFunc) hueAssignFunc();
		setDeviceIR.mutate('ac_display_toggle');
	};

	if (errorState) return <Typography color="error">Error</Typography>;
	if (fetchingState) return <LinearProgress />;
	else
		return (
			<IconButton onClick={handleClick}>
				<BedIcon />
			</IconButton>
		);
};
