import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useFetchRoomsState } from '../homecontrol/HomeAPI';
import { HomeCard } from '../home/HomeCard';

export const HomeHomePage = () => {
	const {
		data: roomList,
		isFetching: fetchingRoomList,
		isError: errorRoomList,
	} = useFetchRoomsState();

	return (
		<Box sx={{ flexGrow: 1, padding: 4 }}>
			{errorRoomList ? (
				<Typography color="error">Error</Typography>
			) : fetchingRoomList ? (
				<CircularProgress />
			) : roomList?.length ? (
				<Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
					{roomList.map((room, i) => (
						<Grid item xs={12} md={6} key={i}>
							<HomeCard room={room}></HomeCard>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography>No rooms found</Typography>
			)}
		</Box>
	);
};
