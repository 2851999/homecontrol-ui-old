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
import { TempDataPoint, useFetchTemps } from '../homecontrol/MonitoringAPI';
import {
	Animation,
	ArgumentScale,
	EventTracker,
} from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';

export interface TemperatureGraphProps {
	deviceName: string;
}

const constructTooltipComponent = (tempsData: TempDataPoint[] | undefined) => {
	return (props: Tooltip.ContentProps) => {
		let text = props.text;
		if (tempsData && props.targetItem.point < tempsData.length) {
			const dataPoint = tempsData[props.targetItem.point];
			text = `${dataPoint.timestamp.toLocaleDateString()} ${dataPoint.timestamp.toLocaleTimeString()}, ${
				dataPoint.temp
			} ℃`;
		}
		return <Tooltip.Content text={text} targetItem={props.targetItem} />;
	};
};

export const TemperatureGraph = (props: TemperatureGraphProps) => {
	const { deviceName } = props;

	const {
		data: tempsData,
		isFetching: fetchingTempsData,
		isError: errorTempsData,
	} = useFetchTemps(deviceName);

	return (
		<Paper sx={{ margin: 4 }}>
			{errorTempsData ? (
				<Typography color="error">Error</Typography>
			) : fetchingTempsData ? (
				<CircularProgress />
			) : (
				<Chart data={tempsData}>
					<Title text={`${deviceName} temperature (℃)`} />

					<ArgumentScale factory={scaleTime} />

					<ArgumentAxis />
					<ValueAxis />
					<Animation />

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
					<Tooltip
						contentComponent={constructTooltipComponent(tempsData)}
					/>
				</Chart>
			)}
		</Paper>
	);
};
