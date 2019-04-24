import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {CollapseProvider} from 'src/utils/CollapseDrawer';
import {urlMap} from './UrlMap';
import {WithHeader} from '../components/header/Header';
import ErrorNotifications from '../components/errors/ErrorNotifications';

const PageLayout = ({urls, NotFound, Header, Footer}) => (
	<CollapseProvider>
		{/*<Header urls={urls}/>*/}
		<WithHeader>
			<Switch>
				{urlMap(urls)}
				<Route component={NotFound}/>
			</Switch>
		</WithHeader>
		<Footer name={'Orest Hopiak'}/>
		<ErrorNotifications/>
	</CollapseProvider>
);

export default PageLayout;
