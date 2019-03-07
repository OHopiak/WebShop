import axios from 'axios';
import {API_PREFIX_TYPE} from '../modules/api';
import {NOP_ACTION} from '../actions';
import {toQueryParams} from '../../utils';

const normalize = target => target.reduce((map, obj) => {
	map[obj.id] = obj;
	return map;
}, {});

/**
 * Checks whether action is for getting data from backend or other
 * @param action to be checked
 * @returns {boolean | *} whether action is for API
 */
const actionIsForApi = action => (
	action.type.startsWith(API_PREFIX_TYPE) && action.payload && (action.payload.url || action.payload.ref)
);

/**
 * Converts actions with url, method and body to actions with data from backend
 * @param config stores information about api
 * @returns {function(*=): function(*=): function(*=)}
 */
const apiMiddleware = config => store => next => action => {
	if (!actionIsForApi(action)) {
		next(action);
		return;
	}


	let client = axios;

	if (store.auth && store.auth.token) {
		client = axios.create({
			headers: {
				common: {
					Authorization: `JWT ${store.auth.token}`
				}
			}
		});
	}

	let request = null;
	let url = null;

	if (action.payload.url)
		url = action.payload.url;
	else if (action.payload.ref)
		url = config.urls[action.payload.ref];
	else {
		next(NOP_ACTION);
		return;
	}

	const requestData = action.payload.body;
	const method = action.payload.method ? action.payload.method : 'GET';

	switch (method) {
		case 'GET':
			if (requestData) url += '?' + toQueryParams(requestData);
			request = client.get(url);
			break;
		case 'POST':
			request = client.post(url, requestData);
			break;
		case 'PUT':
			request = client.put(url, requestData);
			break;
		case 'PATCH':
			request = client.patch(url, requestData);
			break;
		case 'DELETE':
			request = client.delete(url, requestData);
			break;
		default:
			next(NOP_ACTION);
			return;
	}

	request
		.then(response => {
			let newAction = NOP_ACTION;
			if (action.type.endsWith('CREATE') || action.type.endsWith('EDIT')) {
				newAction = {
					type: action.type,
					payload: {
						...action.payload,
						data: response.data,
					},
				};
			} else {
				const isObject = action.type.endsWith('GET');

				const data = isObject
					? [response.data]
					: response.data.results || [];

				const set = normalize(data);
				newAction = {
					type: action.type,
					payload: {
						...action.payload,
						...(isObject ? {} : response.data),
						set: set,
					},
				}
			}
			console.log(newAction);
			next(newAction);
		})
		.catch(error => {
			console.error(error);
			console.error(action);
			next(NOP_ACTION);
		});
};

export default apiMiddleware;
