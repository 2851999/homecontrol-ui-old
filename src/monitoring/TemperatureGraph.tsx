import React from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';
import {
	ArgumentAxis,
	ValueAxis,
	Chart,
	AreaSeries,
	Title,
} from '@devexpress/dx-react-chart-material-ui';
import { useFetchTemps } from '../homecontrol/MonitoringAPI';

export interface TemperatureGraphProps {
	deviceName: string;
}

const getLabelComponent = (
	xLabels: string[],
): React.ComponentType<ArgumentAxis.LabelProps> => {
	return (props: ArgumentAxis.LabelProps) => {
		return xLabels.indexOf(`${props.text}`) > -1 ? (
			<ArgumentAxis.Label {...props} />
		) : null;
	};
};

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

					<ArgumentAxis labelComponent={getLabelComponent(xLabels)} />
					<ValueAxis />

					<AreaSeries
						name="line"
						valueField="temp"
						argumentField="timestamp"
					/>
				</Chart>
			)}
		</Paper>
	);
};
