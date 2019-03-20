import {combineReducers} from 'redux';
import authReducer from './modules/auth';
import itemReducer from './modules/items';
import categoriesReducer from './modules/categories';
import userReducer from './modules/users';
import groupReducer from './modules/groups';

const appReducer = combineReducers({
	auth: authReducer,
	items: itemReducer,
	categories: categoriesReducer,
	users: userReducer,
	groups: groupReducer,
});

const reducer = (state, action) => appReducer(state, action);

export default reducer;
