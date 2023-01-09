import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type TempDataPoint = {
	timestamp: Date;
	temp: number;
};

export const fetchTemps = (name: string): Promise<TempDataPoint[]> => {
	return axios
		.get(`${API_BASE_URL}/monitoring/temps?device_name=${name}`, {
			headers: API_HEADER,
		})
		.then((response) => {
			// Convert each timestamp to a date object
			const data: TempDataPoint[] = [];

			for (let i = 0; i < response.data.length; i++) {
				data.push({
					timestamp: new Date(response.data[i].timestamp),
					temp: response.data[i].temp,
				});
			}
			return data;
		});
};

export const useFetchTemps = (
	name: string,
): UseQueryResult<TempDataPoint[]> => {
	return useQuery<TempDataPoint[], AxiosError>(
		['useFetchTemps', name],
		() => {
			return fetchTemps(name);
		},
	);
};
