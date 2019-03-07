import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PageLayout from './PageLayout';


const Layout = ({urls, NotFound, Header, Footer, Login}) => {
	return (
		<Switch>
			<Route exact path={'/login'} component={Login}/>
			<Route render={() => (
				<PageLayout urls={urls} Footer={Footer}
							Header={Header} NotFound={NotFound}/>
			)}/>
		</Switch>
	);
};

export default Layout;
