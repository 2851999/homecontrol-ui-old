import { Backdrop, Grid, IconButton, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CampaignIcon from '@mui/icons-material/Campaign';
import React from 'react';
import { ACState, usePutDeviceState } from '../homecontrol/AirconAPI';

export const AirConBeepButton = (props: {
	name: string;
	state: ACState | undefined;
	quietMode: boolean;
}) => {
	const { name, state, quietMode } = props;

	const [shhh, setShhh] = React.useState(false);

	const setDeviceStateMutation = usePutDeviceState(name);

	const handleBeep = () => {
		if (state) {
			if (quietMode) {
				setShhh(true);
			} else {
				state.prompt_tone = true;
				setDeviceStateMutation.mutate(state);
			}
		}
	};

	const handleShhhClose = () => {
		setShhh(false);
	};

	return (
		<React.Fragment>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={shhh}
				onClick={handleShhhClose}
			>
				<Grid container alignItems="center" justifyContent="center">
					<Grid item xs={12}>
						<Typography variant="h5">Shhh...</Typography>
					</Grid>
					<Grid item>
						<SentimentVeryDissatisfiedIcon
							sx={{ fontSize: '100px' }}
						/>
					</Grid>
				</Grid>
			</Backdrop>
			<IconButton
				sx={(theme) => ({
					position: 'absolute',
					right: theme.spacing(4),
				})}
				onClick={handleBeep}
			>
				<CampaignIcon />
			</IconButton>
		</React.Fragment>
	);
};
