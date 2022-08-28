import config_dev from '../config_dev.json';
import config_prod from '../config_prod.json';

let config;
if (process.env.REACT_APP_CONFIG_TYPE == 'prod') config = config_prod;
else config = config_dev;

export const API_KEY: string = config.api.auth.key;
export const API_BASE_URL: string = `http://${config.api.ip}:${config.api.port}`;

export const API_HEADER = {
	'content-type': 'application/json',
	'X-Api-Key': API_KEY,
};
