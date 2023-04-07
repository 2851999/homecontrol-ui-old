import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export type APIInfo = {
	version: string;
};

export const fetchInfo = (): Promise<APIInfo> => {
	return axios
		.get(`${API_BASE_URL}/info`, {
			headers: API_HEADER,
		})
		.then((response) => {
			return response.data;
		});
};

export const useFetchInfo = (): UseQueryResult<APIInfo> => {
	return useQuery<APIInfo, AxiosError>(['useFetchInfo'], () => {
		return fetchInfo();
	});
};
