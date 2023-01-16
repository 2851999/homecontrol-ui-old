import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
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
					<Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
						{deviceList.map((name, i) => (
							<Grid item xs={12} xl={6} key={i}>
								<TemperatureGraph deviceName={name} />
							</Grid>
						))}
					</Grid>
					{/* {deviceList.map((name) => (
						<TemperatureGraph deviceName={name} />
					))} */}
				</Box>
			) : (
				<Typography>No devices registered</Typography>
			)}
		</Box>
	);
};
