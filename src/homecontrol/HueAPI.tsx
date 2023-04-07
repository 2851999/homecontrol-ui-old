import axios, { AxiosError } from 'axios';
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from 'react-query';
import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type HueRoom = {
	identifier: string;
	name: string;
	light_group: string | null;
	lights: string[];
};

export type Filters = { [key: string]: string };

export const getURLSearchParams = (filters?: Filters) => {
	const params = new URLSearchParams();
	if (filters) params.append('filters', JSON.stringify(filters));
	return params;
};

export const fetchRooms = (filters?: Filters): Promise<HueRoom[]> => {
	const params = getURLSearchParams(filters);
	return axios
		.get(`${API_BASE_URL}/hue/Home/rooms`, {
			headers: API_HEADER,
			params: params,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchRooms = (filters?: Filters): UseQueryResult<HueRoom[]> => {
	return useQuery<HueRoom[], AxiosError>(['fetchRooms', filters], () => {
		return fetchRooms(filters);
	});
};

export type HueColour = {
	x: number;
	y: number;
};

export type LightState = {
	name: string;
	power: boolean | null;
	brightness: number | null;
	colour: HueColour | null;
	colour_temp: number | null;
};

export const fetchLightState = (lightID: string): Promise<LightState> => {
	return axios
		.get(`${API_BASE_URL}/hue/Home/light/${lightID}`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchLightState = (
	lightID: string,
	enabled?: boolean,
): UseQueryResult<LightState> => {
	return useQuery<LightState, AxiosError>(
		['fetchLightState', lightID],
		() => {
			return fetchLightState(lightID);
		},
		{
			enabled: enabled,
		},
	);
};

export const putLightState = (
	lightID: string,
	state: LightState,
): Promise<string> => {
	return axios
		.put(
			`${API_BASE_URL}/hue/Home/light/${lightID}`,
			JSON.stringify(state),
			{
				headers: API_HEADER,
			},
		)
		.then((response) => {
			return response.data;
		});
};

export const usePutLightState = (lightID: string, lightGroupID: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		(variables: { state: LightState }): Promise<string> => {
			return putLightState(lightID, variables.state);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([
					'fetchGroupedLightState',
					lightGroupID,
				]);
			},
		},
	);
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
	lightGroupID: string,
	enabled?: boolean,
): UseQueryResult<GroupedLightState> => {
	return useQuery<GroupedLightState, AxiosError>(
		['fetchGroupedLightState', lightGroupID],
		() => {
			return fetchGroupedLightState(lightGroupID);
		},
		{
			enabled: enabled,
		},
	);
};

export const putGroupedLightState = (
	lightGroupID: string,
	state: GroupedLightState,
): Promise<string> => {
	return axios
		.put(
			`${API_BASE_URL}/hue/Home/grouped_lights/${lightGroupID}`,
			JSON.stringify(state),
			{
				headers: API_HEADER,
			},
		)
		.then((response) => {
			return response.data;
		});
};

export const usePutGroupedLightState = (
	lightGroupID: string,
	lightsIDs: string,
) => {
	const queryClient = useQueryClient();

	return useMutation(
		(variables: { state: GroupedLightState }): Promise<string> => {
			return putGroupedLightState(lightGroupID, variables.state);
		},
		{
			onSuccess: () => {
				lightsIDs.forEach((lightID) =>
					queryClient.invalidateQueries(['fetchLightState', lightID]),
				);
			},
		},
	);
};

export type HueScene = {
	identifier: string;
	name: string;
	room: string;
};

export const fetchScenes = (filters?: Filters): Promise<HueScene[]> => {
	const params = getURLSearchParams(filters);
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
	filters?: Filters,
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
