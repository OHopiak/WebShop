import {API_PREFIX_TYPE} from './api';

// Types
const TOKEN_PREFIX = API_PREFIX_TYPE + 'TOKEN:';

const TOKEN = Object.freeze({
	GET: TOKEN_PREFIX + 'AUTH',
	CLEAR: TOKEN_PREFIX + 'CLEAR'
});

// Actions
/**
 * Sets token received from API using given username and password
 * @param username
 * @param password
 * @param remember
 * @returns {{type, payload: {ref: string, method: string, body: {username: *, password: *}}}}
 */
const getToken = ({username, password, remember = false}) => ({
	type: TOKEN.GET,
	payload: {
		// url: "/api/auth/token/",
		ref: 'token',
		method: 'POST',
		body: {username, password, remember}
	}
});

/**
 * Sets the token
 * @param token
 * @returns {{type, payload: {token: *}}}
 */
const setToken = token => ({
	type: TOKEN.GET,
	payload: {token}
});

/**
 * Removes token
 * @returns {{type}}
 */
const clearToken = () => ({
	type: TOKEN.CLEAR
});

// Action Aliases
const login = getToken;
const logout = clearToken;

// Reducer
const initState = {
	loggedIn: false
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case TOKEN.GET:
			return {...state, token: action.payload.token, loggedIn: true};
		case TOKEN.CLEAR:
			return {...state, loggedIn: false};
		default:
			return state;
	}
};

// Export
export default authReducer;
export {
	getToken,
	setToken,
	clearToken,
	login,
	logout,

	TOKEN,
};
