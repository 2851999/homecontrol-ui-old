import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';
import { AirConCard } from '../aircon/AirConCard';

export const HomePage = (props: {
	speedDial: React.ReactNode;
	quietMode: boolean;
}) => {
	const { speedDial, quietMode } = props;

	const {
		data: deviceList,
		isFetching: fetchingDeviceList,
		isError: errorDeviceList,
	} = useFetchDeviceList();

	return (
		<Box sx={{ flexGrow: 1, padding: 4 }}>
			{errorDeviceList ? (
				<Typography color="error">Error</Typography>
			) : fetchingDeviceList ? (
				<CircularProgress />
			) : deviceList?.length ? (
				<Grid container rowSpacing={4} columnSpacing={{ xs: 2 }}>
					{deviceList.map((name) => (
						<Grid item xs={12} md={6}>
							<AirConCard
								name={name}
								quietMode={quietMode}
							></AirConCard>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography>No devices registered</Typography>
			)}
			{speedDial}
		</Box>
	);
};
