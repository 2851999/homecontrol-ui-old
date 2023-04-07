import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography/Typography';
import packageConfig from '../../package.json';
import { useFetchInfo } from '../homecontrol/InfoAPI';
import { CircularProgress, Divider } from '@mui/material';

export const Footer = () => {
	const {
		data: apiInfo,
		isFetching: fetchingAPIInfo,
		isError: errorAPIInfo,
	} = useFetchInfo();

	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 0,
				width: '100%',
				color: 'primary.contrastText',
				backgroundColor: 'primary.main',
				textAlign: 'right',
			}}
		>
			<Box
				sx={{
					display: 'inline-flex',
					paddingY: 0.5,
					backgroundColor: 'inherit',
					marginX: 2,
				}}
			>
				{fetchingAPIInfo ? (
					<CircularProgress color="secondary" size="1.5rem" />
				) : errorAPIInfo ? (
					<Typography color="error">Error</Typography>
				) : (
					<Typography>v{apiInfo?.version}</Typography>
				)}
				<Divider
					orientation="vertical"
					flexItem
					sx={{ marginX: 2, bgcolor: 'primary.contrastText' }}
				></Divider>
				<Typography>UI v{packageConfig.version}</Typography>
			</Box>
		</Box>
	);
};
