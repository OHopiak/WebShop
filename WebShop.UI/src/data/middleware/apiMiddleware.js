import qs from 'query-string'

import {API_PREFIX_TYPE} from '../modules/api';
import {NOP_ACTION} from '../actions';
import {addError} from "../modules/errors";

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

	const options = {
		headers: {
			'Content-Type': 'application/json',
		}
	};
	const {auth} = store.getState();

	if (auth && auth.token)
		options.headers.Authorization = `JWT ${auth.token}`;

	const {body, url: requestUrl, ref, method = 'GET'} = action.payload;

	let url = null;

	if (requestUrl)
		url = requestUrl;
	else if (ref)
		url = config.urls[ref];
	else {
		next(NOP_ACTION);
		return;
	}

	options.method = method;

	if (body) {
		if (options.method === 'GET')
			url += '?' + qs.stringify(body);
		else
			options.body = JSON.stringify(body);
	}
	console.log(options);
	fetch(url, options)
		.then(resp => {
			if (resp.status < 200 || resp.status >= 300)
				throw resp;
			return resp.json();
		})
		.then(response => {
			let newAction = NOP_ACTION;
			if (action.type.endsWith('CREATE') || action.type.endsWith('EDIT')) {
				newAction = {
					type: action.type,
					payload: {
						...action.payload,
						data: response,
					},
				};
			} else {
				const isObject = action.type.endsWith('GET');

				const data = isObject
					? [response]
					: response.results || [];

				const set = normalize(data);
				newAction = {
					type: action.type,
					payload: {
						...action.payload,
						...(isObject ? {} : response),
						set: set,
					},
				}
			}
			console.log(newAction);
			next(newAction);
		})
		.catch(response => {
			if (!response.status) {
				console.error("Request failed, unexpected error: " + response);
				return;
			}
			const error = {
				status: response.status,
				message: response.statusText,
			};

			response.json()
				.then(data => {
					console.log(data);
					error.details = data.detail;
					next(addError(error));
				})
				.catch(err => {
					error.details = err;
					console.log(err);
					next(addError(error));
				});

			console.log(response);
		});
};

export default apiMiddleware;
