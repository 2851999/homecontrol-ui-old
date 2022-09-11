import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';
import { AirConCard } from '../aircon/AirConCard';

export const AirConHomePage = () => {
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
				<Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
					{deviceList.map((name, i) => (
						<Grid item xs={12} md={6} key={i}>
							<AirConCard name={name}></AirConCard>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography>No devices registered</Typography>
			)}
		</Box>
	);
};
