// const API_URL = '/api';
// const API_URL = 'http://localhost:8000';
import {API_URL} from './configs.json';

const apiUrl = url => API_URL + url;

const createEndpointUrl = endpoint => url => API_URL + endpoint + url;

const apiUrls = {
	token: apiUrl('/auth/token/'),
};

export {
	apiUrl,
	apiUrls,
	API_URL,
	createEndpointUrl,
};
