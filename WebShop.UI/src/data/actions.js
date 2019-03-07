import {clearToken, getToken, login, logout, setToken} from './modules/auth';
import {getItem, getItems} from './modules/items';
import {getUsers} from './modules/users';

const NOP_ACTION = {type: 'NOP'};

export {
	getToken,
	setToken,
	clearToken,
	login,
	logout,

	getItems,
	getItem,

	getUsers,

	NOP_ACTION,
};
