import React, { useState } from 'react';
import enGB from 'date-fns/locale/en-GB';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { TemperatureGraph } from '../monitoring/TemperatureGraph';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';

const calcDateAgo = (days: number) => {
	const date = new Date();
	date.setDate(date.getDate() - days);
	return date;
};

export const MonitoringPage = () => {
	const {
		data: deviceList,
		isFetching: fetchingDeviceList,
		isError: errorDeviceList,
	} = useFetchDeviceList();

	// Default to the last 90 days
	const [startDate, setStartDate] = useState<Date | undefined>(
		calcDateAgo(90),
	);

	return (
		<Box>
			<LocalizationProvider
				dateAdapter={AdapterDateFns}
				adapterLocale={enGB}
			>
				{errorDeviceList ? (
					<Typography color="error">Error</Typography>
				) : fetchingDeviceList ? (
					<CircularProgress />
				) : deviceList?.length ? (
					<Box>
						<TemperatureGraph
							deviceName="outdoor"
							startDate={startDate}
						/>
						<Grid
							container
							rowSpacing={2}
							columnSpacing={{ xs: 2 }}
						>
							{deviceList.map((name, i) => (
								<Grid item xs={12} xl={6} key={i}>
									<TemperatureGraph
										deviceName={name}
										startDate={startDate}
									/>
								</Grid>
							))}
						</Grid>
						{/* {deviceList.map((name) => (
						<TemperatureGraph deviceName={name} />
					))} */}
						<DatePicker
							label="Start date"
							value={startDate}
							onChange={(newValue) => setStartDate(newValue)}
							sx={{ marginBottom: 2 }}
						/>
					</Box>
				) : (
					<Typography>No devices registered</Typography>
				)}
			</LocalizationProvider>
		</Box>
	);
};
