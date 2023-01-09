import React from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';
import {
	ArgumentAxis,
	ValueAxis,
	Chart,
	AreaSeries,
	Title,
	ZoomAndPan,
	Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { useFetchTemps } from '../homecontrol/MonitoringAPI';
import { ArgumentScale, EventTracker } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';

export interface TemperatureGraphProps {
	deviceName: string;
}

export const TemperatureGraph = (props: TemperatureGraphProps) => {
	const { deviceName } = props;

	const {
		data: tempsData,
		isFetching: fetchingTempsData,
		isError: errorTempsData,
	} = useFetchTemps(deviceName);

	const xLabels = [];
	const maxData = 8;
	if (!fetchingTempsData && !errorTempsData && tempsData) {
		const step = Math.ceil(tempsData.length / maxData);

		for (let i = 0; i < tempsData.length; i += step) {
			xLabels.push(tempsData[i].timestamp);
		}
	}

	return (
		<Paper sx={{ margin: 4 }}>
			{errorTempsData ? (
				<Typography color="error">Error</Typography>
			) : fetchingTempsData ? (
				<CircularProgress />
			) : (
				<Chart data={tempsData}>
					<Title text={`${deviceName} temperature (Celsius)`} />

					<ArgumentScale factory={scaleTime} />

					<ArgumentAxis />
					<ValueAxis />

					<AreaSeries
						name="line"
						valueField="temp"
						argumentField="timestamp"
					/>
					<ZoomAndPan
						interactionWithArguments="both"
						interactionWithValues="both"
					/>
					<EventTracker />
					<Tooltip />
				</Chart>
			)}
		</Paper>
	);
};
