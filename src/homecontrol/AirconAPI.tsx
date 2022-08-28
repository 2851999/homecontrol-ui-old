import axios, { AxiosError } from 'axios';
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type ACState = {
	power: boolean;
	prompt_tone: boolean;
	target: number;
	mode: number;
	fan: number;
	swing: number;
	eco: boolean;
	turbo: boolean;
	fahrenheit: boolean;
	indoor: number;
	outdoor: number;
};

export const fetchDeviceState = (name: string): Promise<ACState> => {
	return axios
		.get(`${API_BASE_URL}/ac/devices/${name}`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchDeviceState = (
	unitName: string,
): UseQueryResult<ACState> => {
	return useQuery<ACState, AxiosError>(['fetchDeviceState', unitName], () => {
		return fetchDeviceState(unitName);
	});
};

export const putDeviceState = (
	name: string,
	state: ACState,
): Promise<string> => {
	return axios
		.put(`${API_BASE_URL}/ac/devices/${name}`, JSON.stringify(state), {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const usePutDeviceState = (unitName: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		(state: ACState): Promise<string> => {
			return putDeviceState(unitName, state);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['fetchDeviceState', unitName]);
			},
		},
	);
};

export const fetchDeviceList = (): Promise<string[]> => {
	return axios
		.get(`${API_BASE_URL}/ac/devices`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchDeviceList = (): UseQueryResult<string[]> => {
	return useQuery<string[], AxiosError>([], () => {
		return fetchDeviceList();
	});
};

export const getModeAsString = (mode: number | undefined) => {
	switch (mode) {
		case 1:
			return 'auto';
		case 2:
			return 'cool';
		case 3:
			return 'dry';
		case 4:
			return 'heat';
		case 5:
			return 'fan';
		default:
			return 'invalid';
	}
};

export const getModeFromString = (mode: string) => {
	switch (mode) {
		case 'auto':
			return 1;
		case 'cool':
			return 2;
		case 'dry':
			return 3;
		case 'heat':
			return 4;
		case 'fan':
			return 5;
		default:
			return 0;
	}
};

export const getFanSpeedAsString = (mode: number | undefined) => {
	switch (mode) {
		case 102:
			return 'auto';
		case 100:
			return 'full';
		case 80:
			return 'high';
		case 60:
			return 'medium';
		case 40:
			return 'low';
		case 20:
			return 'silent';
		default:
			return 'invalid';
	}
};

export const getFanSpeedFromString = (mode: string) => {
	switch (mode) {
		case 'auto':
			return 102;
		case 'full':
			return 100;
		case 'high':
			return 80;
		case 'medium':
			return 60;
		case 'low':
			return 40;
		case 'silent':
			return 20;
		default:
			return 0;
	}
};
