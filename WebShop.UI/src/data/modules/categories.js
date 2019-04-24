import {apiEndpoint} from './api';
import {createEndpointUrl} from '../../configs/urls';

const endpoint = '/categories';

// Reducer
const {reducer, actions} = apiEndpoint('CATEGORIES', endpoint);

// Actions
const endpointUrl = createEndpointUrl(endpoint);

const getCategories = actions.getAll;
const getCategory = actions.getById;
const createCategory = actions.create;
const editCategory = actions.edit;
const deleteCategory = actions.delete;

// Selectors
const selectCategorySet = state => state.categories.set;
const selectCategoryList = state => state.categories.list;
const selectCategoryById = state => id => state.categories.set[id];

// Exports
export default reducer;
export {
	reducer,
	getCategories,
	getCategory,
	createCategory,
	editCategory,
	deleteCategory,

	selectCategorySet,
	selectCategoryList,
	selectCategoryById
};
