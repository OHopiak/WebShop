import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const setupStore = (store) => ({
	loggedIn: store.auth.loggedIn
});

const loginRequired = Child => connect(setupStore, {})(props => {
	const {loggedIn, match} = props;
	if (loggedIn)
		return <Child {...props}/>;
	else {
		let url = '/login';
		if (match.url) url += '?next=' + match.url;
		return <Redirect to={url}/>;
	}
});

export default loginRequired;
