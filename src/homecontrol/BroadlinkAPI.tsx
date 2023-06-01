import axios from 'axios';
import { useMutation } from 'react-query';

import { API_BASE_URL, API_HEADER } from './HomeControlAPI';

export const putIR = (deviceName: string, commandName: string) => {
	return axios
		.put(
			`${API_BASE_URL}/broadlink/${deviceName}/ir/${commandName}`,
			undefined,
			{
				headers: API_HEADER,
			},
		)
		.then((response) => {
			return response.data;
		});
};

export const usePutIR = (deviceName: string) => {
	return useMutation((commandName: string) => {
		return putIR(deviceName, commandName);
	});
};
