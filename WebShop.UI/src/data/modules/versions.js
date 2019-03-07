import {apiEndpoint} from './api';

// Reducer
const {reducer, actions} = apiEndpoint('VERSIONS', '/versions');

// Actions
const getVersions = actions.getAll;
const getVersion = actions.getById;
const getVersionsFiltered = actions.getFiltered;

// Selectors
const selectVersionSet = (store) => store.versions.set;
const selectVersionList = (store) => store.versions.list;
const selectVersionById = store => id => store.versions.set[id];

// Exports
export default reducer;
export {
	getVersions,
	getVersion,
	getVersionsFiltered,

	selectVersionSet,
	selectVersionList,
	selectVersionById,
};
