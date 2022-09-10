import { Grid, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const PageNotFound = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		>
			<Grid item xs={3}>
				<SentimentVeryDissatisfiedIcon
					sx={{ fontSize: 200, marginBottom: 4 }}
				/>
				<Typography variant="h2">404</Typography>
				<Typography variant="h4">Page not found</Typography>
			</Grid>
		</Grid>
	);
};
