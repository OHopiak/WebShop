import {combineReducers} from 'redux';
import authReducer from './modules/auth';
import itemReducer from './modules/items';
import userReducer from './modules/users';
import groupReducer from './modules/groups';
import deploymentReducer from './modules/deployments';
import versionReducer from './modules/versions';

const appReducer = combineReducers({
	auth: authReducer,
	items: itemReducer,
	users: userReducer,
	groups: groupReducer,
	deploy: deploymentReducer,
	versions: versionReducer,
});

const reducer = (state, action) => appReducer(state, action);

export default reducer;
