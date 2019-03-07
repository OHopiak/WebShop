import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {CollapseProvider} from 'src/utils/CollapseDrawer';
import {urlMap} from './UrlMap';

const PageLayout = ({urls, NotFound, Header, Footer}) => (
	<CollapseProvider>
		<Header urls={urls}/>
		<Switch>
			{/*<UrlMap urls={urls}/>*/}
			{urlMap(urls)}
			<Route component={NotFound}/>
		</Switch>
		<Footer name={'Orest Hopiak'}/>
	</CollapseProvider>
);

export default PageLayout;
