import React from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { useFetchTemps } from '../homecontrol/MonitoringAPI';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';
import {
	NameType,
	ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export interface TemperatureGraphProps {
	deviceName: string;
	startDate?: Date;
}

const timestampFormatter = (timestamp: Date) => {
	return timestamp.toLocaleString();
};

const CustomTooltip = ({
	active,
	payload,
}: TooltipProps<ValueType, NameType>) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<p className="label">{`${timestampFormatter(
					payload[0].payload.timestamp,
				)} : ${payload[0].value} ℃`}</p>
			</div>
		);
	}
};

export const TemperatureGraph = (props: TemperatureGraphProps) => {
	const { deviceName, startDate } = props;

	const {
		data: tempsData,
		isFetching: fetchingTempsData,
		isError: errorTempsData,
	} = useFetchTemps(deviceName, undefined, undefined, startDate, undefined);

	return (
		<Paper
			sx={{
				margin: 4,
				width: (theme) => `calc(100%-${theme.spacing(4)}px)`,
				height: '600px',
			}}
		>
			<Typography
				variant="h5"
				sx={{ padding: 2 }}
			>{`${deviceName} temperature (℃)`}</Typography>
			{errorTempsData ? (
				<Typography color="error">Error</Typography>
			) : fetchingTempsData ? (
				<CircularProgress />
			) : (
				<ResponsiveContainer width="95%" height="90%">
					<AreaChart
						width={500}
						height={300}
						data={tempsData}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="timestamp"
							tickFormatter={timestampFormatter}
						/>
						<YAxis />
						<Tooltip
							content={CustomTooltip}
							wrapperStyle={{ outline: 'none' }}
						/>
						<Area
							type="monotone"
							dataKey="temp"
							stroke="#8884d8"
							fill="#8884d8"
						/>
					</AreaChart>
				</ResponsiveContainer>
			)}
		</Paper>
	);
};
