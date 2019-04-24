import * as qs from 'query-string';

import {API_PREFIX_TYPE, CREATE, EDIT, GET, GET_ALL, GET_FILTERED} from '../modules/api';
import {NOP_ACTION} from '../actions';
import {addError} from '../modules/errors';
import {normalize} from '../../utils';

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
	fetch(url, options)
		.then(resp => {
			if (resp.status < 200 || resp.status >= 300)
				throw resp;
			return resp.json();
		})
		.then(processResponse(action, next))
		.catch(processErrors(action, next));
};

const processResponse = (action, next) => response => {
	console.log(response);
	let newAction = NOP_ACTION;
	const responseTypeParts = action.type.split(':');
	const responseType = responseTypeParts[responseTypeParts.length - 1];
	switch (responseType) {
		case CREATE:
		case EDIT:
			newAction = {
				type: action.type,
				payload: {
					...action.payload,
					data: response,
				},
			};
			break;
		case GET: {
			const set = normalize([response]);
			newAction = {
				type: action.type,
				payload: {
					...action.payload,
					set: set,
				},
			};
			break;
		}
		case GET_ALL:
		case GET_FILTERED: {
			const data = response.results;

			const set = normalize(data);
			newAction = {
				type: action.type,
				payload: {
					...action.payload,
					...response,
					set: set,
				},
			};
			break;
		}
		default: {
			newAction = {
				type: action.type,
				payload: {
					...action.payload,
					data: response,
				},
			};
		}
	}
	console.log(newAction);
	next(newAction);
};

const processErrors = (action, next) => response => {
	if (!response.status) {
		console.error('Request failed, unexpected error: ' + response);
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
};

export default apiMiddleware;
