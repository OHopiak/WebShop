import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import {apiMiddleware, cookieMiddleware} from './middleware';
import {apiUrls, cookies} from 'src/configs';
import {TOKEN} from './modules/auth';

let logger = store => next => next;

if (process.env.NODE_ENV === 'development') {
	const {createLogger} = require('redux-logger');
	logger = createLogger({
		collapsed: true,
	});
}

const persistConfig = {
	blacklist: ['messages']
};

const api = apiMiddleware({
	urls: apiUrls
});

const middleware = applyMiddleware(
	api,
	cookieMiddleware(cookies, TOKEN),
	logger,
);

// const store = createStore(persistReducer(persistConfig, reducer), middleware);
// const persist = persistStore(store);
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware,
);

export default store;
