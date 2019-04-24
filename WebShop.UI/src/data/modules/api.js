import {createEndpointUrl} from '../../configs/urls';

const API_PREFIX_TYPE = 'API:';

const GET_ALL = 'GET_ALL';
const GET_FILTERED = 'GET_FILTERED';
const GET = 'GET';
const NEXT = 'NEXT';
const CLEAR_LAST = 'CLEAR_LAST';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const DELETE = 'DELETE';

const generateListActionType = name => {
	const prefix = API_PREFIX_TYPE + name + ':';
	return Object.freeze({
		PREFIX: prefix,
		GET_ALL: prefix + 'GET_ALL',
		GET_FILTERED: prefix + 'GET_FILTERED',
		GET: prefix + 'GET',
		GET_NEXT: prefix + 'NEXT',
		CLEAR_LAST: prefix + 'CLEAR_LAST',
		CREATE: prefix + 'CREATE',
		EDIT: prefix + 'EDIT',
		DELETE: prefix + 'DELETE',
	});
};

/**
 * Creates a type and a reducer for an api endpoint
 * @param type action type prefix
 * @param endpoint relative url of the api endpoint (example: /users)
 * @param initState the initial state for the reducer
 * @returns {{type: *, reducer: reducer}}
 */
const apiEndpoint = (type, endpoint, initState = {}) => {
	const TYPE = generateListActionType(type);
	const endpointUrl = createEndpointUrl(endpoint);
	const startState = {
		...initState,
		set: {},
		fetched: false,
	};
	const reducer = (state = startState, action) => {
		switch (action.type) {
			case TYPE.GET_ALL:
				return {
					...state,
					...action.payload,
					list: action.payload.results,
					set: {
						...state.set,
						...action.payload.set,
					},
					fetched: true
				};
			case TYPE.GET_FILTERED:
				return {
					...state,
					...action.payload,
					filteredList: action.payload.results,
					set: {
						...state.set,
						...action.payload.set,
					},
					fetched: true
				};
			case TYPE.GET:
				return {
					...state,
					set: {
						...state.set,
						...action.payload.set,
					},
					fetched: true,
				};
			case TYPE.CLEAR_LAST:
				return {
					...state,
					latest: null,
				};
			case TYPE.CREATE:
				return {
					...state,
					set: {
						...state.set,
						[action.payload.data.id]: action.payload.data,
					},
					list: [
						...(state.list || []),
						action.payload.data,
					],
					fetched: true,
				};
			case TYPE.EDIT: {
				const newList = [...(state.list || [])];
				if (state.list) {
					const position = state.list.findIndex(x => +x.id === +action.payload.data.id);
					newList[position] = action.payload.data;
				}
				return {
					...state,
					set: {
						...state.set,
						[action.payload.data.id]: action.payload.data,
					},
					list: newList,
					fetched: true,
				};
			}
			case TYPE.DELETE: {
				const newList = state.list.filter(x => +x.id !== action.payload.data.id);
				return {
					...state,
					set: {
						...state.set,
						[action.payload.data.id]: undefined,
					},
					list: newList,
					fetched: true,
				};
			}
			default:
				return state;
		}
	};
	const actions = {
		getAll: (filter) => ({
			type: TYPE.GET_ALL,
			payload: {
				url: endpointUrl('/'),
				body: filter,
			}
		}),
		getFiltered: (filter) => ({
			type: TYPE.GET_FILTERED,
			payload: {
				url: endpointUrl('/'),
				body: filter
			}
		}),
		getById: id => ({
			type: TYPE.GET,
			payload: {
				url: endpointUrl(`/${id}/`),
			}
		}),
		create: data => ({
			type: TYPE.CREATE,
			payload: {
				url: endpointUrl('/'),
				method: 'POST',
				body: data
			}
		}),
		edit: data => ({
			type: TYPE.EDIT,
			payload: {
				url: endpointUrl(`/${data.id}/`),
				method: 'PUT',
				body: data,
			}
		}),
		delete: id => ({
			type: TYPE.EDIT,
			payload: {
				url: endpointUrl(`/${id}/`),
				method: 'DELETE',
			}
		}),
	};

	return {
		type: TYPE,
		reducer,
		actions,
		endpointUrl,
	};
};

export {
	API_PREFIX_TYPE,
	generateListActionType,
	apiEndpoint,

	GET_ALL,
	GET_FILTERED,
	GET,
	NEXT,
	CLEAR_LAST,
	CREATE,
	EDIT,
	DELETE,
};
