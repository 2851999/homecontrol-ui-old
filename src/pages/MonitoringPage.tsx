import React, { useEffect, useState } from 'react';
import enGB from 'date-fns/locale/en-GB';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { TemperatureGraph } from '../monitoring/TemperatureGraph';
import { useFetchDeviceList } from '../homecontrol/AirconAPI';
import { useSearchParams } from 'react-router-dom';

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

	const [startDate, setStartDate] = useState<Date>();

	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		const dateStr = searchParams.get("start")
		if (dateStr == null) {
			// Default to the last 30 days
			searchParams.set("start", calcDateAgo(30).toISOString());
			setSearchParams(searchParams, {replace: true});
		} else
			setStartDate(new Date(dateStr))
	}, [searchParams, setSearchParams])

	const handleChange = (newValue: Date | null) => {
		if (newValue) {
			searchParams.set("start", newValue.toISOString());
			setSearchParams(searchParams);
		}
	}

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
						<DatePicker
							label="Start date"
							value={startDate}
							onChange={handleChange}
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
