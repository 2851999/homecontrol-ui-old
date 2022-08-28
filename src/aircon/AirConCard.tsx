import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { useFetchDeviceState } from '../homecontrol/AirconAPI';
import { Link as RouterLink } from 'react-router-dom';
import { AirConPowerButton } from './AirConPowerButton';
import { NightModeButton } from '../homecontrol/NightModeButton';

export interface AirConCardProps {
	name: string;
	quietMode: boolean;
}

export const AirConCard = (props: AirConCardProps) => {
	const { name, quietMode } = props;
	const {
		data: deviceState,
		isFetching: fetchingState,
		isError: errorState,
	} = useFetchDeviceState(name);

	return (
		<Card>
			<CardActionArea component={RouterLink} to={`/unit?name=${name}`}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					{errorState ? (
						<Typography color="error">Error</Typography>
					) : fetchingState ? (
						<CircularProgress />
					) : (
						<Typography>{deviceState?.indoor}&deg;C</Typography>
					)}
				</CardContent>
			</CardActionArea>
			<AirConPowerButton
				name={name}
				state={deviceState}
				quietMode={quietMode}
			/>
			<NightModeButton
				name={name}
				state={deviceState}
				quietMode={quietMode}
			/>
		</Card>
	);
};
