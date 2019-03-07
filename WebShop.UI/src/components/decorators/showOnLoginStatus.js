import {connect} from 'react-redux';
import React from 'react';
import showComponent from './showComponent';

const loggedIn = (redirect = false) => connect((store) => ({
	show: !!store.auth.loggedIn,
	redirect,
}));

const loggedOff = (redirect = false) => connect((store) => ({
	show: !store.auth.loggedIn,
	redirect,
}));


const showOnStatus = modifier => Child => modifier(showComponent(Child));
const showOnLoggedIn = showOnStatus(loggedIn());
const showOnLoggedOff = showOnStatus(loggedOff());
const redirectOnLoggedIn = showOnStatus(loggedIn(true));
const redirectOnLoggedOff = showOnStatus(loggedOff(true));

const componentOnStatus = modifier => modifier(({children}) => children);
const ShowOnLoggedIn = componentOnStatus(showOnLoggedIn);
const ShowOnLoggedOff = componentOnStatus(showOnLoggedOff);

export {
	showOnLoggedIn,
	showOnLoggedOff,
	redirectOnLoggedIn,
	redirectOnLoggedOff,
	ShowOnLoggedIn,
	ShowOnLoggedOff,
};
