import {NOP_ACTION} from "../actions";

/**
 * Sets cookies for certain types of actions
 * @param cookies variable that stores cookies
 * @param TOKEN types of action
 * @returns {function(*): function(*): function(*=)}
 */
const cookieMiddleware = (cookies, TOKEN) => () => next => action => {
	switch (action.type) {
		case TOKEN.GET: {
			if (!action.payload.token) {
				next(NOP_ACTION);
				break;
			}
			const maxAge = (action.payload.body && action.payload.body.remember)
				? 7 * 24 * 60 * 60 // 7 days
				: 5 * 60 * 60; // 5 hours
			cookies.set('TOKEN', action.payload.token, {path: '/', maxAge: maxAge,});
			break;
		}
		case TOKEN.CLEAR:
			cookies.remove('TOKEN', {path: '/'});
			break;
	}
	next(action);
};

export default cookieMiddleware;
