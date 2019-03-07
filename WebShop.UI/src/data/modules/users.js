import {apiEndpoint} from './api';

// Reducer
const {reducer, type, actions} = apiEndpoint('USERS', '/users');

// Actions
const getUsers = actions.getAll;
const getUser = actions.getById;
const getUsersFiltered = actions.getFiltered;

// Selectors
const selectUsersSet = (store) => store.users.set;
const selectUserById = (store, id) => store.users.set[id];

// Exports
export default reducer;
export {
	getUsers,
	getUser,
	getUsersFiltered,

	selectUsersSet,
	selectUserById,
};
