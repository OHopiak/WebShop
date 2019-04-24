import {apiEndpoint} from './api';
import {createEndpointUrl} from '../../configs/urls';

const endpoint = '/users';
const endpointUrl = createEndpointUrl(endpoint);

const initState = {
	current: {},
};

// Reducer
const {reducer, type, actions} = apiEndpoint('USERS', endpoint, initState);

const USERS_GET_CURRENT = type.PREFIX + 'SELF';

const modifiedReducer = (state = initState, action) => {
	if (action.type === USERS_GET_CURRENT) {
		return {
			...state,
			current: {...action.payload.data},
		};
	} else {
		return reducer(state, action);
	}
};

// Actions
const getUsers = actions.getAll;
const getUser = actions.getById;
const getUsersFiltered = actions.getFiltered;
const getCurrentUser = () => ({
	type: USERS_GET_CURRENT,
	payload: {
		url: endpointUrl('/current'),
	}
});


// Selectors
const selectUsersSet = (store) => store.users.set;
const selectUserById = (store, id) => store.users.set[id];
const selectCurrentUser = (store, id) => store.users.current;

// Exports
export default modifiedReducer;
export {
	getUsers,
	getUser,
	getUsersFiltered,
	getCurrentUser,

	selectUsersSet,
	selectUserById,
	selectCurrentUser,
};
