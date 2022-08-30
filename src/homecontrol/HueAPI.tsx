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
		.get(`${API_BASE_URL}/hue/Home/grouped_lights/${name}`, {
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

export type HueScene = {
	identifier: string;
	name: string;
	room: string;
};

export const fetchScenes = (filters?: {
	[key: string]: string;
}): Promise<HueScene[]> => {
	const params = new URLSearchParams();
	if (filters) params.append('filters', JSON.stringify(filters));
	return axios
		.get(`${API_BASE_URL}/hue/Home/scenes`, {
			headers: API_HEADER,
			params: params,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchScenes = (
	filters?: {
		[key: string]: string;
	},
	enabled?: boolean,
): UseQueryResult<HueScene[]> => {
	return useQuery<HueScene[], AxiosError>(
		['fetchScenes', filters],
		() => {
			return fetchScenes(filters);
		},
		{
			enabled: enabled,
		},
	);
};

export const putScene = (scene_id: string): Promise<string> => {
	return axios
		.put(
			`${API_BASE_URL}/hue/Home/scenes/${scene_id}`,
			JSON.stringify({ test: 'test' }), // Won't accept nothing
			{
				headers: API_HEADER,
			},
		)
		.then((response) => {
			return response.data;
		});
};

export const usePutScene = () => {
	return useMutation((scene_id: string): Promise<string> => {
		return putScene(scene_id);
	});
};
