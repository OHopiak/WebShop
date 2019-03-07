import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from 'src/data/actions';
import PropTypes from 'prop-types';

const setupStore = store => ({
	loggedIn: store.auth.loggedIn
});

const setupDispatch = dispatch => ({
	logout: () => dispatch(logout())
});

const Logout = connect(setupStore, setupDispatch)(props => {
	props.logout();
	return <Redirect to={props.redirectTo ? props.redirectTo : '/'}/>;
});
Logout.propTypes = {
	redirectTo: PropTypes.string
};

export default Logout;
