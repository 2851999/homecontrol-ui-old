import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type TempDataPoint = {
	timestamp: Date;
	temp: number;
};

const convertDateTime = (datetime: Date): string => {
	return `${datetime.getFullYear()}-${
		datetime.getMonth() + 1
	}-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

export const fetchTemps = (
	deviceName: string,
	count?: number,
	step?: number,
	start?: Date,
	end?: Date,
): Promise<TempDataPoint[]> => {
	const params = new URLSearchParams();
	params.append('device_name', deviceName);
	if (count) params.append('count', count.toString());
	if (step) params.append('step', step.toString());
	if (start) params.append('start', convertDateTime(start));
	if (end) params.append('end', convertDateTime(end));

	return axios
		.get(`${API_BASE_URL}/monitoring/temps`, {
			headers: API_HEADER,
			params: params,
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
	deviceName: string,
	count?: number,
	step?: number,
	start?: Date,
	end?: Date,
): UseQueryResult<TempDataPoint[]> => {
	return useQuery<TempDataPoint[], AxiosError>(
		['useFetchTemps', deviceName, count, step, start, end],
		() => {
			return fetchTemps(deviceName, count, step, start, end);
		},
	);
};
