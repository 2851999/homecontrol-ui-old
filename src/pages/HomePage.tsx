import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';
import { AirConCard } from '../aircon/AirConCard';

export const HomePage = (props: { speedDial: React.ReactNode }) => {
	const { speedDial } = props;

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
					{deviceList.map((name, i) => (
						<Grid item xs={12} md={6} key={i}>
							<AirConCard name={name}></AirConCard>
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
