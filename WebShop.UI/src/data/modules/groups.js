import {apiEndpoint} from './api';

// Reducer
const {reducer, type, actions} = apiEndpoint('GROUPS', '/groups');

// Actions
const getGroups = actions.getAll;
const getGroup = actions.getById;

// Selectors
const selectGroupsAll = (state, id) => state.groups.set;
const selectGroupById = (state, id) => state.groups.set[id];

// Exports
export default reducer;
export {
	getGroups,
	getGroup,

	selectGroupById
};
