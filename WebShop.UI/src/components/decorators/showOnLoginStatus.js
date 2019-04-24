import {connect} from 'react-redux';
import React from 'react';
import showComponent from './showComponent';
import {selectAdminMode} from '../../data/modules/settings';
import {selectCurrentUser} from '../../data/modules/users';

const loggedIn = (redirect = false) => connect((store) => ({
	show: !!store.auth.loggedIn,
	redirect,
}));

const loggedOff = (redirect = false) => connect((store) => ({
	show: !store.auth.loggedIn,
	redirect,
}));

const adminStatus = (redirect = false) => connect((store) => ({
	show: !!selectCurrentUser(store).is_staff,
	redirect,
}));

const adminMode = (redirect = false) => connect((store) => ({
	show: !!selectAdminMode(store) && selectCurrentUser(store).is_staff,
	redirect,
}));


const showOnStatus = modifier => Child => modifier(showComponent(Child));
const showOnLoggedIn = showOnStatus(loggedIn());
const showOnLoggedOff = showOnStatus(loggedOff());
const showOnAdminMode = showOnStatus(adminMode());
const showOnAdminUser = showOnStatus(adminStatus());
const redirectOnLoggedIn = showOnStatus(loggedIn(true));
const redirectOnLoggedOff = showOnStatus(loggedOff(true));

const componentOnStatus = modifier => modifier(({children}) => children);
const ShowOnLoggedIn = componentOnStatus(showOnLoggedIn);
const ShowOnLoggedOff = componentOnStatus(showOnLoggedOff);
const ShowOnAdminMode = componentOnStatus(showOnAdminMode);
const ShowOnAdminUser = componentOnStatus(showOnAdminUser);

export {
	showOnLoggedIn,
	showOnLoggedOff,
	redirectOnLoggedIn,
	redirectOnLoggedOff,
	ShowOnLoggedIn,
	ShowOnLoggedOff,
	ShowOnAdminMode,
	ShowOnAdminUser,
};
