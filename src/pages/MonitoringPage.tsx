import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { TemperatureGraph } from '../monitoring/TemperatureGraph';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';

export const MonitoringPage = () => {
	const {
		data: deviceList,
		isFetching: fetchingDeviceList,
		isError: errorDeviceList,
	} = useFetchDeviceList();

	return (
		<Box>
			{errorDeviceList ? (
				<Typography color="error">Error</Typography>
			) : fetchingDeviceList ? (
				<CircularProgress />
			) : deviceList?.length ? (
				<Box>
					<TemperatureGraph deviceName="outdoor" />
					{deviceList.map((name) => (
						<TemperatureGraph deviceName={name} />
					))}
				</Box>
			) : (
				<Typography>No devices registered</Typography>
			)}
		</Box>
	);
};
