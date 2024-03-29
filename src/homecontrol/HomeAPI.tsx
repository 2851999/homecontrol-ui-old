import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type Room = {
	name: string;
	ac_device_name?: string;
	hue_room_id?: string;
	hue_light_group?: string;
	hue_lights?: string[];
};

export type RoomState = {
	state_id: string;
	name: string;
	room_name: string;
	icon: string;
	ac_device_name?: string;
	ac_state_id?: string;
	hue_scene_id?: string;
	broadlink_device_name?: string;
	broadlink_actions?: string[];
};

export const fetchRooms = (): Promise<Room[]> => {
	return axios
		.get(`${API_BASE_URL}/home/rooms?bridge_name=Home`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchRoomsState = (): UseQueryResult<Room[]> => {
	return useQuery<Room[], AxiosError>(['useFetchRoomsState'], () => {
		return fetchRooms();
	});
};

export const fetchOutdoorTemp = (): Promise<string> => {
	return axios
		.get(`${API_BASE_URL}/home/outdoor_temp`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchOutdoorTemp = (): UseQueryResult<string> => {
	return useQuery<string, AxiosError>(['useFetchOutdoorTemp'], () => {
		return fetchOutdoorTemp();
	});
};

export const fetchRoomStates = (roomName: string): Promise<RoomState[]> => {
	return axios
		.get(`${API_BASE_URL}/home/room/${roomName}/states`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchRoomStates = (roomName: string): UseQueryResult<RoomState[]> => {
	return useQuery<RoomState[], AxiosError>([`useFetchRoomStates-${roomName}`], () => {
		return fetchRoomStates(roomName);
	});
};

export const putRoomState = (
	stateID: string,
): Promise<RoomState> => {
	return axios
		.put(`${API_BASE_URL}/home/rooms/state/${stateID}`, {}, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const usePutRoomState = (room: Room, state: RoomState) => {
	const queryClient = useQueryClient();

	return useMutation(
		(): Promise<RoomState> => {
			return putRoomState(state.state_id);
		},
		{
			onSuccess: () => {
				if (state.ac_device_name && state.ac_state_id)
					// Invalidate AC queries
					queryClient.invalidateQueries(['fetchDeviceState', room.ac_device_name]);
				if (state.hue_scene_id) {
					// Invalidate light queries
					queryClient.invalidateQueries(['fetchGroupedLightState', room.hue_light_group]);
					if (room.hue_lights) {
						room.hue_lights.forEach((lightID) =>
							queryClient.invalidateQueries(['fetchLightState', lightID]),
						);
					}
				}
			},
		},
	);
};