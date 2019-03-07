import {apiEndpoint, createEndpointUrl} from './api';

const endpoint = '/items';

// Reducer
const {reducer, actions} = apiEndpoint('ITEMS', endpoint);

// Actions
const endpointUrl = createEndpointUrl(endpoint);

const getItems = actions.getAll;
const getItem = actions.getById;
const createItem = actions.create;
const editItem = actions.edit;

// Selectors
const selectItemSet = state => state.items.set;
const selectItemList = state => state.items.list;
const selectItemById = state => id => state.items.set[id];

// Exports
export default reducer;
export {
	reducer,
	getItems,
	getItem,
	createItem,
	editItem,

	selectItemSet,
	selectItemList,
	selectItemById
};
