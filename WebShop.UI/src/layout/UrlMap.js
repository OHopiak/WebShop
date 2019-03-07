import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loginRequired from '../components/decorators/loginRequired';
import {redirectOnLoggedIn, redirectOnLoggedOff} from '../components/decorators/showOnLoginStatus';

const modifiers = {
	loginRequired,
	showOnLoggedOff: redirectOnLoggedOff,
	showOnLoggedIn: redirectOnLoggedIn,
};

const useModifier = (component, name) => {
	const modifier = modifiers[name];
	return modifier ? modifier(component) : component;
};

/*const UrlItem = ({url, component, urlPrefix}) => {
	const Component = url.modifiers ?
		url.modifiers.reduce(useModifier, component) : component;
	return (
		<Route exact={!url.routes && url.exact}
			   path={urlPrefix + url.path} component={url.routes ? () => (
			<Switch>
				<Route exact path={urlPrefix + url.path}
					   component={Component}/>
				<UrlMap urls={url.routes} urlPrefix={urlPrefix + url.path}/>
			</Switch>
		) : Component
		}/>
	);
};

const UrlMap = ({urls, urlPrefix = ''}) => (
	<React.Fragment>
		{Object.entries(urls).map(([name, url]) => {
			return (
				<UrlItem key={name} urlPrefix={urlPrefix}
						 url={url} component={url.component}/>
			)
		})}
	</React.Fragment>
);*/

const urlItem = (url, urlPrefix, key) => {
	const {component} = url;
	const Component = url.modifiers ?
		url.modifiers.reduce(useModifier, component) : component;
	return (
		<Route exact={!url.routes && url.exact} key={key}
			   path={urlPrefix + url.path} component={url.routes ? () => (
			<Switch>
				<Route exact path={urlPrefix + url.path}
					   component={Component}/>
				{urlMap(url.routes, urlPrefix + url.path)}
			</Switch>
		) : Component
		}/>
	);
};


const urlMap = (urls, urlPrefix = '') => Object.entries(urls).map(([name, url]) =>
	urlItem(url, urlPrefix, name)
);


export {
	// UrlItem,
	// UrlMap,
	urlMap,
};
