import React from 'react';
import {Redirect} from 'react-router-dom';

const showComponent = Child => ({show = true, redirect = false, ...props}) => {
	if (show)
		return <Child {...props}/>;
	else if (redirect) {
		return <Redirect to='/'/>;
	} else {
		return <React.Fragment/>;
	}
};

export default showComponent;
