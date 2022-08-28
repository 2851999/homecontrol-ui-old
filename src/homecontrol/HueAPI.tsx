import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, UseQueryResult } from 'react-query';
import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type HueRoom = {
	identifier: string;
	light_group: string | null;
	devices: string[];
};

export type HueFetchRoomsResponse = { [key: string]: HueRoom };

export const fetchRooms = (): Promise<HueFetchRoomsResponse> => {
	return axios
		.get(`${API_BASE_URL}/hue/Home/rooms`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchRooms = (): UseQueryResult<{
	[key: string]: HueRoom;
}> => {
	return useQuery<HueFetchRoomsResponse, AxiosError>(['fetchRooms'], () => {
		return fetchRooms();
	});
};

export type HueColour = {
	x: number;
	y: number;
};

export type GroupedLightState = {
	power: boolean | null;
	brightness: number | null;
	colour: HueColour | null;
	colour_temp: number | null;
};

export const fetchGroupedLightState = (
	name: string,
): Promise<GroupedLightState> => {
	return axios
		.get(`${API_BASE_URL}/hue/Home/room/${name}`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchGroupedLightState = (
	light_group: string,
): UseQueryResult<GroupedLightState> => {
	return useQuery<GroupedLightState, AxiosError>(
		['fetchGroupedLightState', light_group],
		() => {
			return fetchGroupedLightState(light_group);
		},
	);
};

export const putGroupedLightState = (
	light_group: string,
	state: GroupedLightState,
): Promise<string> => {
	return axios
		.put(
			`${API_BASE_URL}/hue/Home/grouped_lights/${light_group}`,
			JSON.stringify(state),
			{
				headers: API_HEADER,
			},
		)
		.then((response) => {
			return response.data;
		});
};

export const usePutGroupedLightState = () => {
	return useMutation(
		(variables: {
			light_group: string;
			state: GroupedLightState;
		}): Promise<string> => {
			return putGroupedLightState(variables.light_group, variables.state);
		},
	);
};
