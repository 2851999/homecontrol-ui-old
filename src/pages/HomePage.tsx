import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Link as RouterLink } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Footer } from '../footer/Footer';

export const TextIconPair = (props: { text: string; icon: ReactNode }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			<Typography sx={{ mx: 1 }}>{props.text}</Typography>
			{props.icon}
		</Box>
	);
};

export const HomePage = () => {
	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1, padding: 4 }}>
				<Typography variant="h3" sx={{ mb: 4 }}>
					HomeControl
				</Typography>
				<Grid
					container
					rowSpacing={4}
					columnSpacing={{ xs: 2 }}
					justifyContent="center"
				>
					<Grid item xs={12} md={7}>
						<Card>
							<CardActionArea
								component={RouterLink}
								to={`/rooms`}
							>
								<CardContent>
									<TextIconPair
										text="Rooms"
										icon={<HomeIcon />}
									/>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} md={7}>
						<Card>
							<CardActionArea
								component={RouterLink}
								to={`/monitoring`}
							>
								<CardContent>
									<TextIconPair
										text="Monitoring"
										icon={<TimelineIcon />}
									/>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Box>
			<Footer />
		</React.Fragment>
	);
};
